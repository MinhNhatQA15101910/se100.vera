using API.DTOs.Albums;
using API.DTOs.Files;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;

namespace API.Controllers;

public class AlbumsController(
    IUnitOfWork unitOfWork,
    IFileService fileService,
    IMapper mapper
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AlbumDto>> GetAlbumById(int id)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound();
        }

        var albumDto = mapper.Map<AlbumDto>(album);

        var userId = User.GetUserId();
        if (userId == -1)
        {
            albumDto.State = null;
            return albumDto;
        }

        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        if (!User.IsInRole("Admin") && album.PublisherId != userId)
        {
            albumDto.State = null;
        }

        return albumDto;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums([FromQuery] AlbumParams albumParams)
    {
        var albums = await unitOfWork.AlbumRepository.GetAlbumsAsync(albumParams);

        var userId = User.GetUserId();
        if (userId == -1)
        {
            foreach (var album in albums)
            {
                album.State = null;
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
                foreach (var album in albums)
                {
                    album.State = null;
                }
            }
        }

        Response.AddPaginationHeader(albums);

        return Ok(albums);
    }

    [HttpPost]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<AlbumDto>> CreateAlbum([FromForm] NewAlbumDto newAlbumDto)
    {
        if (newAlbumDto == null)
        {
            return BadRequest("Invalid album data.");
        }

        var userId = User.GetUserId();
        newAlbumDto.PublisherId = userId;

        var album = mapper.Map<Album>(newAlbumDto);

        // Add album to database
        unitOfWork.AlbumRepository.CreateAlbum(album);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to create album.");
        }

        // Add current user as album publisher
        var publisher = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (publisher == null)
        {
            return BadRequest("User not found.");
        }
        album.Publisher = publisher;

        // Add current user to artistIds
        if (newAlbumDto.ArtistIds != null)
        {
            if (!newAlbumDto.ArtistIds.Contains(userId))
            {
                newAlbumDto.ArtistIds.Add(userId);
            }
        }
        else
        {
            newAlbumDto.ArtistIds = [userId];
        }

        // Add album artists
        foreach (var artistId in newAlbumDto.ArtistIds)
        {
            // Check if artistId is not valid
            var artist = await unitOfWork.UserRepository.GetUserByIdAsync(artistId);
            if (artist == null || !artist.UserRoles.Any(ur => ur.Role.Name == "Artist"))
            {
                return BadRequest("Artist not found.");
            }

            // Add artist to album
            var artistAlbum = new ArtistAlbum
            {
                AlbumId = album.Id,
                ArtistId = artistId
            };
            album.Artists.Add(artistAlbum);
        }

        // Add album genres
        if (newAlbumDto.GenreIds == null || newAlbumDto.GenreIds.Count == 0)
        {
            return BadRequest("Album must have at least one genre.");
        }

        foreach (var genreId in newAlbumDto.GenreIds)
        {
            var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(genreId);
            if (genre == null)
            {
                return BadRequest("Genre not found.");
            }

            var albumGenre = new AlbumGenre
            {
                AlbumId = album.Id,
                GenreId = genreId
            };
            album.Genres.Add(albumGenre);
        }

        // Upload images and add to database
        if (newAlbumDto.PhotoFile != null)
        {
            var uploadResult = await fileService.UploadImageAsync("/albums/" + album.Id, newAlbumDto.PhotoFile);
            if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

            var albumPhoto = new AlbumPhoto
            {
                Url = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId,
                IsMain = true
            };

            album.Photos.Add(albumPhoto);
        }

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to create album.");
        }

        return CreatedAtAction(
            nameof(GetAlbumById),
            new { id = album.Id },
            mapper.Map<AlbumDto>(album)
        );
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin, Artist")]
    public async Task<ActionResult> UpdateAlbum(int id, UpdateAlbumDto updateAlbumDto)
    {
        var userId = User.GetUserId();

        // Check album exist
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate user role
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (!user!.UserRoles.Any(ur => ur.Role.Name == "Admin") && album.PublisherId != userId)
        {
            return Unauthorized("Unauthorized to update album.");
        }

        mapper.Map(updateAlbumDto, album);

        // Update artists
        if (updateAlbumDto.ArtistIds != null && updateAlbumDto.ArtistIds.Count > 0)
        {
            // Check if any artistId is not valid
            foreach (var artistId in updateAlbumDto.ArtistIds)
            {
                var artist = await unitOfWork.UserRepository.GetUserByIdAsync(artistId);
                if (artist == null || !artist.UserRoles.Any(ur => ur.Role.Name == "Artist"))
                {
                    return BadRequest("Artist not found.");
                }
            }

            // Remove old artists
            album.Artists.Clear();

            // Add current user to artistIds
            if (!updateAlbumDto.ArtistIds.Contains(userId))
            {
                updateAlbumDto.ArtistIds.Add(userId);
            }

            // Add new artists
            foreach (var artistId in updateAlbumDto.ArtistIds)
            {
                var artistAlbum = new ArtistAlbum
                {
                    AlbumId = album.Id,
                    ArtistId = artistId
                };
                album.Artists.Add(artistAlbum);
            }
        }

        // Update genres
        if (updateAlbumDto.GenreIds != null && updateAlbumDto.GenreIds.Count > 0)
        {
            // Check if any genreId is not valid
            foreach (var genreId in updateAlbumDto.GenreIds)
            {
                var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(genreId);
                if (genre == null)
                {
                    return BadRequest("Genre not found.");
                }
            }

            // Remove old genres
            album.Genres.Clear();

            // Add new genres
            foreach (var genreId in updateAlbumDto.GenreIds)
            {
                var albumGenre = new AlbumGenre
                {
                    AlbumId = album.Id,
                    GenreId = genreId
                };
                album.Genres.Add(albumGenre);
            }
        }

        // Update album image
        if (updateAlbumDto.PhotoFile != null)
        {
            // Delete old image
            foreach (var oldPhoto in album.Photos)
            {
                if (oldPhoto.PublicId != null)
                {
                    var result = await fileService.DeleteFileAsync(oldPhoto.PublicId!, ResourceType.Image);
                    if (result.Error != null) return BadRequest("Delete album file from cloudinary failed: " + result.Error.Message);
                }
            }
            album.Photos.Clear();

            // Upload new images and add to database
            var uploadResult = await fileService.UploadImageAsync("/albums/" + album.Id, updateAlbumDto.PhotoFile);
            if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

            var albumPhoto = new AlbumPhoto
            {
                Url = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId,
                IsMain = true
            };
            album.Photos.Add(albumPhoto);
        }

        // Update album's updated date
        album.State = ArtworkState.Pending.ToString();
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to update album.");
        }

        return NoContent();
    }

    [HttpPut("update-photo/{id:int}")]
    public async Task<ActionResult<FileDto>> UpdatePhoto(int id, IFormFile file)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null) return BadRequest("Cannot update album");

        // Check user role
        var userId = User.GetUserId();
        if (userId != album.PublisherId && !User.IsInRole("Admin"))
        {
            return Unauthorized("You are not authorized to update this album.");
        }

        // Delete old photo
        foreach (var ap in album.Photos)
        {
            if (ap.PublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(ap.PublicId, ResourceType.Image);
                if (deleteResult.Error != null) return BadRequest(deleteResult.Error.Message);
            }
        }
        album.Photos.Clear();

        // Upload new photo
        var result = await fileService.UploadImageAsync("/albums/" + album.Id, file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var albumPhoto = new AlbumPhoto
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            IsMain = true
        };
        album.Photos.Add(albumPhoto);

        album.State = ArtworkState.Pending.ToString();
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete()) return BadRequest("Problem adding photo");

        return CreatedAtAction(
            nameof(GetAlbumById),
            new { id = album.Id },
            mapper.Map<FileDto>(albumPhoto)
        );
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin, Artist")]
    public async Task<ActionResult> DeleteAlbum(int id)
    {
        var userId = User.GetUserId();

        // Check album exist
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate user role
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (!user!.UserRoles.Any(ur => ur.Role.Name == "Admin") && album.PublisherId != userId)
        {
            return Unauthorized("Unauthorized to delete album.");
        }

        // Delete album photos
        foreach (var photo in album.Photos)
        {
            if (photo.PublicId != null)
            {
                var result = await fileService.DeleteFileAsync(photo.PublicId!, ResourceType.Image);
                if (result.Error != null) return BadRequest("Delete album file from cloudinary failed: " + result.Error.Message);
            }
        }

        unitOfWork.AlbumRepository.DeleteAlbum(album);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to delete album.");
        }

        return NoContent();
    }

    [HttpPut("add-song/{id:int}")]
    [Authorize(Roles = "Artist, Admin")]
    public async Task<ActionResult> AddSongToAlbum(int id, AddRemoveSongDto addSongDto)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate if the user is authorized to add song to the album
        var userId = User.GetUserId();
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null)
        {
            return BadRequest("Invalid user id.");
        }
        if (!User.IsInRole("Admin") && album.PublisherId != userId)
        {
            return Unauthorized("You are not authorized to add song to this album.");
        }

        var song = await unitOfWork.SongRepository.GetSongByIdAsync(addSongDto.SongId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        // Validate if the song belongs to the artist
        if (!User.IsInRole("Admin") && song.PublisherId != userId)
        {
            return Unauthorized("You are not authorized to add song to this album.");
        }

        // Check if the song is already in the album
        var albumSong = album.Songs.Where(s => s.SongId == song.Id).FirstOrDefault();
        if (albumSong != null)
        {
            return BadRequest("Song already in album.");
        }

        // Add album song to database
        if (addSongDto.Order != null)
        {
            if (addSongDto.Order < 1)
            {
                return BadRequest("Invalid order.");
            }

            var maxOrder = album.Songs.Count;
            if (addSongDto.Order <= maxOrder)
            {
                foreach (var albSong in album.Songs)
                {
                    if (albSong.Order >= addSongDto.Order)
                    {
                        albSong.Order++;
                    }
                }
            }

            album.Songs.Add(new AlbumSong
            {
                AlbumId = album.Id,
                SongId = song.Id,
                Order = addSongDto.Order.Value
            });
        }
        else
        {
            var maxOrder = album.Songs.Count;

            album.Songs.Add(new AlbumSong
            {
                AlbumId = album.Id,
                SongId = song.Id,
                Order = maxOrder + 1
            });
        }

        // Update album's total songs and update date
        album.TotalSongs++;

        // Update album's total duration
        if (string.IsNullOrEmpty(album.TotalDuration))
        {
            album.TotalDuration = song.Duration;
        }
        else
        {
            _ = TimeSpan.TryParse(album.TotalDuration, out TimeSpan albumTotalDuration);
            _ = TimeSpan.TryParse(song.Duration, out TimeSpan songDuration);
            albumTotalDuration += songDuration;
            album.TotalDuration = albumTotalDuration.ToString(@"hh\:mm\:ss");
        }

        // Update timestamp
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to add song to album.");
        }

        return NoContent();
    }

    [HttpPut("remove-song/{id:int}")]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult> RemoveSongFromAlbum(int id, AddRemoveSongDto removeSongDto)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate if the user is authorized to remove song from the album
        var userId = User.GetUserId();
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null)
        {
            return BadRequest("Invalid user id.");
        }
        if (!User.IsInRole("Admin") && album.PublisherId != userId)
        {
            return Unauthorized("You are not authorized to remove song from this album.");
        }

        var song = await unitOfWork.SongRepository.GetSongByIdAsync(removeSongDto.SongId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        // Validate if the user is authorized to remove song from the album
        if (!User.IsInRole("Admin") && song.PublisherId != userId)
        {
            return Unauthorized("You are not authorized to remove song from this album.");
        }

        // Validate if the song is in the album
        var albumSong = album.Songs.Where(s => s.SongId == song.Id).FirstOrDefault();
        if (albumSong == null)
        {
            return BadRequest("Song not in album.");
        }

        // Remove song from album
        album.Songs.Remove(albumSong);

        // Update songAlbums order.
        foreach (var albSong in album.Songs)
        {
            if (albSong.Order > albumSong.Order)
            {
                albSong.Order--;
            }
        }

        // Update album's total songs and update date
        album.TotalSongs--;

        // Update album's total duration
        _ = TimeSpan.TryParse(album.TotalDuration, out TimeSpan albumTotalDuration);
        _ = TimeSpan.TryParse(song.Duration, out TimeSpan songDuration);
        albumTotalDuration -= songDuration;
        album.TotalDuration = albumTotalDuration.TotalSeconds == 0 ? "" : albumTotalDuration.ToString(@"hh\:mm\:ss");

        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to remove song from album.");
        }

        return NoContent();
    }

    [HttpPost("toggle-favorite/{albumId:int}")]
    [Authorize]
    public async Task<ActionResult> ToggleFavorite(int albumId)
    {
        int userId = User.GetUserId();

        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(albumId);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        var existingFavoriteAlbum = album.UserFavorites.Where(fa => fa.UserId == userId).FirstOrDefault();
        if (existingFavoriteAlbum == null)
        {
            var favoriteAlbum = new AlbumFavorite
            {
                AlbumId = albumId,
                UserId = userId
            };
            album.UserFavorites.Add(favoriteAlbum);
        }
        else
        {
            album.UserFavorites.Remove(existingFavoriteAlbum);
        }

        if (await unitOfWork.Complete()) return Ok();

        return BadRequest("Failed to add song to favorite.");
    }

    [HttpGet("is-favorite/{albumId:int}")]
    [Authorize]
    public async Task<ActionResult<bool>> IsUserFavorite(int albumId)
    {
        int userId = User.GetUserId();

        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(albumId);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        return album.UserFavorites.Any(fa => fa.UserId == userId);
    }

    [HttpPatch("approve/{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> ApproveAlbum(int id)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        album.State = ArtworkState.Approved.ToString();
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to approve album.");
        }

        // Create notification to user
        var notification = new Notification
        {
            UserId = album.PublisherId,
            Title = "Album approved",
            Content = $"Your album {album.AlbumName} has been approved by admin, come and check now.",
            Type = NotificationType.AlbumApproved.ToString(),
            NotifyEntityId = album.Id
        };
        unitOfWork.NotificationRepository.AddNotification(notification);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to notify to album's publisher.");
        }

        return NoContent();
    }

    [HttpPatch("reject/{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> RejectAlbum(int id)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        album.State = ArtworkState.Rejected.ToString();
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to reject album.");
        }

        // Create notification to user
        var notification = new Notification
        {
            UserId = album.PublisherId,
            Title = "Album rejected",
            Content = $"Your album {album.AlbumName} has been rejected by admin, come and check now.",
            Type = NotificationType.AlbumRejected.ToString(),
            NotifyEntityId = album.Id
        };
        unitOfWork.NotificationRepository.AddNotification(notification);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to notify to album's publisher.");
        }

        return NoContent();
    }
}
