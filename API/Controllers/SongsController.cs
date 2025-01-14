using API.DTOs.Files;
using API.DTOs.Notifications;
using API.DTOs.Songs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;
using API.SignalR;

namespace API.Controllers;

public class SongsController(
    IMapper mapper,
    IUnitOfWork unitOfWork,
    IFileService fileService,
    IHubContext<NotificationHub> notificationHub
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<SongDto>> GetSongById(int id)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound();
        }

        var songDto = mapper.Map<SongDto>(song);

        var userId = User.GetUserId();
        if (userId == -1)
        {
            songDto.State = null;
        }
        else
        {
            var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("Invalid user id.");
            }

            if (!User.IsInRole("Admin") && userId != song.PublisherId)
            {
                songDto.State = null;
            }
        }

        return songDto;
    }

    [HttpPost]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<SongDto>> AddSong([FromForm] NewSongDto newSongDto)
    {
        var userId = User.GetUserId();
        newSongDto.PublisherId = userId;

        var song = mapper.Map<Song>(newSongDto);
        unitOfWork.SongRepository.AddSong(song);

        // Save song
        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to add song.");
        }

        // Add publisher to song
        var publisher = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (publisher == null)
        {
            return BadRequest("Invalid publisher id.");
        }
        song.Publisher = publisher;

        // Update song genres
        if (newSongDto.GenreIds == null || newSongDto.GenreIds.Count == 0)
        {
            return BadRequest("Song must have at least one genre.");
        }

        foreach (var genreId in newSongDto.GenreIds)
        {
            // Check if genre exists
            var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(genreId);
            if (genre == null)
            {
                return BadRequest("Invalid genre id: " + genreId);
            }

            var songGenre = new SongGenre
            {
                SongId = song.Id,
                GenreId = genreId
            };
            song.Genres.Add(songGenre);
        }

        // Update song artists
        if (newSongDto.ArtistIds == null || newSongDto.ArtistIds.Count == 0)
        {
            newSongDto.ArtistIds = [publisher.Id];
        }

        foreach (var artistId in newSongDto.ArtistIds)
        {
            // Check if artist exists
            var artist = await unitOfWork.UserRepository.GetUserByIdAsync(artistId);
            if (artist == null || !artist.UserRoles.Any(ur => ur.Role.Name == "Artist"))
            {
                return BadRequest("Invalid artist id: " + artistId);
            }

            var artistSong = new ArtistSong
            {
                ArtistId = artistId,
                SongId = song.Id
            };
            song.Artists.Add(artistSong);
        }

        // Get song duration
        song.Duration = GetSongDuration(newSongDto.MusicFile);

        // Upload and add music file
        var uploadAudioResult = await fileService.UploadAudioAsync("/songs/" + song.Id + "/audio", newSongDto.MusicFile);
        if (uploadAudioResult.Error != null)
        {
            return BadRequest("Upload song file to cloudinary failed: " + uploadAudioResult.Error.Message);
        }
        song.MusicUrl = uploadAudioResult.Url.ToString();
        song.MusicPublicId = uploadAudioResult.PublicId;

        // Upload and add lyric file
        if (newSongDto.LyricFile != null)
        {
            var uploadResult = await fileService.UploadLyricAsync("/songs/" + song.Id + "/lyrics", newSongDto.LyricFile);
            if (uploadResult.Error != null)
            {
                return BadRequest("Upload lyric file to cloudinary failed: " + uploadResult.Error.Message);
            }
            song.LyricUrl = uploadResult.Url.ToString();
            song.LyricPublicId = uploadResult.PublicId;
        }

        // Upload and add photo file
        if (newSongDto.PhotoFile != null)
        {
            var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id + "/images", newSongDto.PhotoFile);
            if (uploadResult.Error != null)
            {
                return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);
            }

            var songPhoto = new SongPhoto
            {
                Url = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId,
                IsMain = true
            };
            song.Photos.Add(songPhoto);
        }

        // Update timestamp
        song.CreatedAt = DateTime.UtcNow;
        song.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to add song.");
        }

        return CreatedAtAction(
            nameof(GetSongById),
            new { id = song.Id },
            mapper.Map<SongDto>(song)
        );

    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<SongDto>> UpdateSong([FromForm] UpdateSongDto updateSongDto, int id)
    {
        var userId = User.GetUserId();
        updateSongDto.PublisherId = userId;

        // Check if song exists
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound("Song not found.");
        }
        if (userId != song.PublisherId && !User.IsInRole("Admin"))
        {
            return Unauthorized("You are not authorized to update this song.");
        }

        // Update song info
        mapper.Map(updateSongDto, song);

        // Update genres
        if (updateSongDto.GenreIds != null && updateSongDto.GenreIds.Count > 0)
        {
            song.Genres.Clear();

            foreach (var genreId in updateSongDto.GenreIds)
            {
                // Check if genre exists
                var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(genreId);
                if (genre == null)
                {
                    return BadRequest("Invalid genre id: " + genreId);
                }

                // Add genre to song
                var songGenre = new SongGenre
                {
                    SongId = song.Id,
                    GenreId = genreId
                };
                song.Genres.Add(songGenre);
            }
        }

        // Update artists
        if (updateSongDto.ArtistIds != null && updateSongDto.ArtistIds.Count > 0)
        {
            // Delete old artists
            song.Artists.Clear();

            // Add current user as artist
            if (!updateSongDto.ArtistIds.Contains(userId))
            {
                updateSongDto.ArtistIds.Add(userId);
            }

            foreach (var artistId in updateSongDto.ArtistIds)
            {
                var artistSong = new ArtistSong
                {
                    ArtistId = artistId,
                    SongId = song.Id
                };
                song.Artists.Add(artistSong);
            }
        }

        // Update music file
        if (updateSongDto.MusicFile != null)
        {
            if (song.MusicPublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(song.MusicPublicId, ResourceType.Video);
                if (deleteResult.Error != null) return BadRequest("Delete song file from cloudinary failed: " + deleteResult.Error.Message);
            }

            var uploadAudioResult = await fileService.UploadAudioAsync("/songs/" + song.Id + "/audio", updateSongDto.MusicFile);
            if (uploadAudioResult.Error != null) return BadRequest("Upload song file to cloudinary failed: " + uploadAudioResult.Error.Message);

            song.MusicUrl = uploadAudioResult.Url.ToString();
            song.MusicPublicId = uploadAudioResult.PublicId;

            song.Duration = GetSongDuration(updateSongDto.MusicFile);
        }

        // Update lyric file
        if (updateSongDto.LyricFile != null)
        {
            if (song.LyricPublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(song.LyricPublicId, ResourceType.Raw);
                if (deleteResult.Error != null) return BadRequest("Delete lyric file from cloudinary failed: " + deleteResult.Error.Message);
            }

            var uploadResult = await fileService.UploadLyricAsync("/songs/" + song.Id + "/lyrics", updateSongDto.LyricFile);
            if (uploadResult.Error != null) return BadRequest("Upload lyric file to cloudinary failed: " + uploadResult.Error.Message);

            song.LyricUrl = uploadResult.Url.ToString();
            song.LyricPublicId = uploadResult.PublicId;
        }

        // Update photo file
        if (updateSongDto.PhotoFile != null)
        {
            // Delete old photos
            foreach (var sp in song.Photos)
            {
                if (sp.PublicId != null)
                {
                    var deleteResult = await fileService.DeleteFileAsync(sp.PublicId, ResourceType.Image);
                    if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                }
            }
            song.Photos.Clear();

            var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id + "/images", updateSongDto.PhotoFile);
            if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

            var songPhoto = new SongPhoto
            {
                Url = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId,
                IsMain = true
            };
            song.Photos.Add(songPhoto);
        }

        // Update timestamp
        song.UpdatedAt = DateTime.UtcNow;
        song.State = ArtworkState.Pending.ToString();

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to update song.");
        }

        return NoContent();
    }

    [HttpPut("update-photo/{id:int}")]
    public async Task<ActionResult<FileDto>> UpdatePhoto(int id, IFormFile file)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null) return BadRequest("Cannot update song");

        // Check user role
        var userId = User.GetUserId();
        if (userId != song.PublisherId && !User.IsInRole("Admin"))
        {
            return Unauthorized("You are not authorized to update this song.");
        }

        // Delete old photo
        foreach (var sp in song.Photos)
        {
            if (sp.PublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(sp.PublicId, ResourceType.Image);
                if (deleteResult.Error != null) return BadRequest(deleteResult.Error.Message);
            }
        }
        song.Photos.Clear();

        // Upload new photo
        var result = await fileService.UploadImageAsync("/songs/" + song.Id + "/images", file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var songPhoto = new SongPhoto
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            IsMain = true
        };
        song.Photos.Add(songPhoto);

        song.UpdatedAt = DateTime.UtcNow;
        song.State = ArtworkState.Pending.ToString();

        if (!await unitOfWork.Complete()) return BadRequest("Problem adding photo");

        return CreatedAtAction(
            nameof(GetSongById),
            new { id = song.Id },
            mapper.Map<FileDto>(songPhoto)
        );
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs([FromQuery] SongParams songParams)
    {
        if (songParams.PageNumber < 1 || songParams.PageSize < 1)
        {
            return BadRequest("Invalid page number or page size.");
        }

        if (songParams.PublisherId != null && !int.TryParse(songParams.PublisherId, out _))
        {
            return BadRequest("Invalid publisher id.");
        }

        var songs = await unitOfWork.SongRepository.GetSongsAsync(songParams);

        var userId = User.GetUserId();
        if (userId == -1)
        {
            foreach (var song in songs)
            {
                song.State = null;
            }
        }
        else
        {
            var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("Invalid user id.");
            }

            if (!User.IsInRole("Admin"))
            {
                foreach (var song in songs)
                {
                    song.State = null;
                }
            }
        }

        Response.AddPaginationHeader(songs);

        return Ok(songs);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Artist, Admin")]
    public async Task<ActionResult> DeleteSong(int id)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound();
        }

        var userId = User.GetUserId();
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null)
        {
            return Unauthorized("User not found.");
        }
        if (userId != song.PublisherId && !User.IsInRole("Admin"))
        {
            return Unauthorized("You are not authorized to delete this song.");
        }

        if (song.Albums.Count > 0)
        {
            return BadRequest("Song is in an album.");
        }

        foreach (var songPhoto in song.Photos)
        {
            if (songPhoto.PublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(songPhoto.PublicId, ResourceType.Image);
                if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
            }
        }

        if (song.MusicPublicId != null)
        {
            var deleteResult = await fileService.DeleteFileAsync(song.MusicPublicId, ResourceType.Video);
            if (deleteResult.Error != null) return BadRequest("Delete song file from cloudinary failed: " + deleteResult.Error.Message);
        }

        if (song.LyricPublicId != null)
        {
            var deleteResult = await fileService.DeleteFileAsync(song.LyricPublicId, ResourceType.Raw);
            if (deleteResult.Error != null) return BadRequest("Delete lyric file from cloudinary failed: " + deleteResult.Error.Message);
        }

        unitOfWork.SongRepository.RemoveSong(song);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to delete song.");
        }

        return Ok();
    }

    [HttpPost("toggle-favorite/{songId:int}")]
    [Authorize]
    public async Task<ActionResult> ToggleFavorite(int songId)
    {
        int userId = User.GetUserId();

        var song = await unitOfWork.SongRepository.GetSongByIdAsync(songId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        var existingFavoriteSong = song.UserFavorites.FirstOrDefault(sf => sf.UserId == userId);
        if (existingFavoriteSong == null)
        {
            var favoriteSong = new SongFavorite
            {
                SongId = songId,
                UserId = userId
            };
            song.UserFavorites.Add(favoriteSong);
        }
        else
        {
            song.UserFavorites.Remove(existingFavoriteSong);
        }

        if (await unitOfWork.Complete()) return Ok();

        return BadRequest("Failed to add song to favorite.");
    }

    [HttpGet("is-favorite/{songId:int}")]
    [Authorize]
    public async Task<ActionResult<bool>> IsUserFavorite(int songId)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(songId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        return song.UserFavorites.Any(sf => sf.UserId == User.GetUserId());
    }

    [HttpPatch("approve/{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ApproveSong(int id)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        song.State = ArtworkState.Approved.ToString();
        song.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to approve song.");
        }

        var notification = new Notification
        {
            UserId = song.PublisherId,
            Title = "Song approved",
            Content = $"Your song {song.SongName} has been approved by admin, come and check now.",
            Type = NotificationType.SongApproved.ToString(),
            NotifyEntityId = song.Id
        };
        unitOfWork.NotificationRepository.AddNotification(notification);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to notify to song's publisher.");
        }

        if (NotificationHub.UserConnections.TryGetValue(song.Id.ToString(), out string? userConnectionId))
        {
            await notificationHub.Clients.Client(userConnectionId).SendAsync("ReceiveNotification", mapper.Map<NotificationDto>(notification));
        }

        return NoContent();
    }

    [HttpPatch("reject/{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> RejectSong(int id)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        song.State = ArtworkState.Rejected.ToString();
        song.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to reject song.");
        }

        var notification = new Notification
        {
            UserId = song.PublisherId,
            Title = "Song rejected",
            Content = $"Your song {song.SongName} has been rejected by admin, come and check now.",
            Type = NotificationType.SongRejected.ToString(),
            NotifyEntityId = song.Id
        };
        unitOfWork.NotificationRepository.AddNotification(notification);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to notify to song's publisher.");
        }

        if (NotificationHub.UserConnections.TryGetValue(song.Id.ToString(), out string? userConnectionId))
        {
            await notificationHub.Clients.Client(userConnectionId).SendAsync("ReceiveNotification", mapper.Map<NotificationDto>(notification));
        }

        return NoContent();
    }

    [HttpPost("download/{id:int}")]
    [Authorize]
    public async Task<ActionResult> DownloadSong(int id)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        var userId = User.GetUserId();
        var download = song.Downloads.FirstOrDefault(d => d.UserId == userId);
        if (download == null)
        {
            download = new Download
            {
                UserId = userId,
                SongId = id,
                Count = 1
            };
            song.Downloads.Add(download);
        }
        else
        {
            download.Count++;
        }

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to download song.");
        }

        return Ok();
    }

    [HttpPut("increase-views/{id:int}")]
    public async Task<ActionResult> IncreaseViews(int id)
    {
        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        song.TotalViews++;
        song.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to increase views.");
        }

        return NoContent();
    }

    private static string GetSongDuration(IFormFile audioFile)
    {
        if (audioFile == null)
        {
            return "";
        }

        using var stream = audioFile.OpenReadStream();
        using var reader = new Mp3FileReader(stream);

        var duration = reader.TotalTime;
        return duration.ToString(@"hh\:mm\:ss");
    }
}
