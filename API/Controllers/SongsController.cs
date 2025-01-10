using API.DTOs.Songs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;

namespace API.Controllers;

public class SongsController(
    IMapper mapper,
    IUnitOfWork unitOfWork,
    IFileService fileService
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

        return mapper.Map<SongDto>(song);
    }

    [HttpPost]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<SongDto>> AddSong([FromForm] NewSongDto newSongDto)
    {
        if (newSongDto == null)
        {
            return BadRequest("Invalid song data.");
        }

        var userId = User.GetUserId();
        newSongDto.PublisherId = userId;

        if (newSongDto.MusicFile == null)
        {
            return BadRequest("Audio file is required.");
        }

        if (newSongDto.ArtistIds == null)
        {
            return BadRequest("At least one artist is required.");
        }
        else
        {
            foreach (var artistId in newSongDto.ArtistIds)
            {
                var artist = await unitOfWork.UserRepository.GetUserByIdAsync(artistId);
                if (artist == null)
                {
                    return BadRequest("Invalid artist id.");
                }
            }
        }

        if (newSongDto.GenreIds == null)
        {
            return BadRequest("At least one genre is required.");
        }
        else
        {
            foreach (var genreId in newSongDto.GenreIds)
            {
                var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(genreId);
                if (genre == null)
                {
                    return BadRequest("Invalid genre id.");
                }
            }
        }

        var song = await unitOfWork.SongRepository.AddSongAsync(newSongDto);

        var publisher = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (publisher == null)
        {
            return BadRequest("Invalid publisher id.");
        }
        song.Publisher = publisher;

        foreach (var artistId in newSongDto.ArtistIds)
        {
            var artistSong = new ArtistSong
            {
                ArtistId = artistId,
                SongId = song.Id
            };
        }

        foreach (var genreId in newSongDto.GenreIds)
        {
            var songGenre = new SongGenre
            {
                SongId = song.Id,
                GenreId = genreId
            };
            unitOfWork.SongGenreRepository.AddSongGenre(songGenre);
        }

        // Get song duration
        song.Duration = GetSongDuration(newSongDto.MusicFile);

        var uploadAudioResult = await fileService.UploadAudioAsync("/songs/" + song.Id + "/audio/", newSongDto.MusicFile);

        if (uploadAudioResult.Error != null)
            return BadRequest("Upload song file to cloudinary failed: " + uploadAudioResult.Error.Message);

        song.MusicUrl = uploadAudioResult.Url.ToString();
        song.MusicPublicId = uploadAudioResult.PublicId;

        if (newSongDto.LyricFile != null)
        {
            var uploadResult = await fileService.UploadLyricAsync("/songs/" + song.Id + "lyric", newSongDto.LyricFile);

            if (uploadResult.Error != null) return BadRequest("Upload lyric file to cloudinary failed: " + uploadResult.Error.Message);

            song.LyricUrl = uploadResult.Url.ToString();
            song.LyricPublicId = uploadResult.PublicId;
        }

        bool isMain = true;
        if (newSongDto.PhotoFiles != null)
        {
            foreach (var photo in newSongDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id + "/images", photo);

                if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

                var songPhoto = new SongPhoto
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                    IsMain = isMain
                };
                song.Photos.Add(songPhoto);

                isMain = false;
            }
        }

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

        var song = await unitOfWork.SongRepository.GetSongByIdAsync(id);

        if (song == null)
        {
            return NotFound("Song not found.");
        }
        if (userId != song.PublisherId)
        {
            return Unauthorized("You are not authorized to update this song.");
        }

        mapper.Map(updateSongDto, song);

        if (updateSongDto.GenreIds != null)
        {
            var songGenres = await unitOfWork.SongGenreRepository.GetSongGenresBySongIdAsync(song.Id);
            if (songGenres != null)
            {
                foreach (var songGenre in songGenres)
                {
                    unitOfWork.SongGenreRepository.RemoveSongGenre(songGenre);
                }
            }
            foreach (var genreId in updateSongDto.GenreIds)
            {
                var songGenre = new SongGenre
                {
                    SongId = song.Id,
                    GenreId = genreId
                };
                unitOfWork.SongGenreRepository.AddSongGenre(songGenre);
            }
        }

        if (updateSongDto.ArtistIds != null)
        {
            var artistSongs = await unitOfWork.ArtistSongRepository.GetArtistSongsAsync(song.Id);
            if (artistSongs != null)
            {
                foreach (var artistSong in artistSongs)
                {
                    unitOfWork.ArtistSongRepository.RemoveArtistSong(artistSong);
                }
            }
            foreach (var artistId in updateSongDto.ArtistIds)
            {
                var artistSong = new ArtistSong
                {
                    ArtistId = artistId,
                    SongId = song.Id
                };
                unitOfWork.ArtistSongRepository.AddArtistSong(artistSong);
            }
        }

        if (updateSongDto.MusicFile != null)
        {
            if (song.MusicPublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(song.MusicPublicId, ResourceType.Video);
                if (deleteResult.Error != null) return BadRequest("Delete song file from cloudinary failed: " + deleteResult.Error.Message);
            }

            var uploadAudioResult = await fileService.UploadAudioAsync("/songs/" + song.Id, updateSongDto.MusicFile);

            if (uploadAudioResult.Error != null) return BadRequest("Upload song file to cloudinary failed: " + uploadAudioResult.Error.Message);

            song.MusicUrl = uploadAudioResult.Url.ToString();
            song.MusicPublicId = uploadAudioResult.PublicId;
        }

        if (updateSongDto.LyricFile != null)
        {
            if (song.LyricPublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(song.LyricPublicId, ResourceType.Raw);
                if (deleteResult.Error != null) return BadRequest("Delete lyric file from cloudinary failed: " + deleteResult.Error.Message);
            }

            var uploadResult = await fileService.UploadLyricAsync("/songs/" + song.Id, updateSongDto.LyricFile);

            if (uploadResult.Error != null) return BadRequest("Upload lyric file to cloudinary failed: " + uploadResult.Error.Message);

            song.LyricUrl = uploadResult.Url.ToString();
            song.LyricPublicId = uploadResult.PublicId;
        }

        if (updateSongDto.PhotoFiles != null)
        {
            foreach (var songPhoto in song.Photos)
            {
                if (songPhoto.PublicId != null)
                {
                    var deleteResult = await fileService.DeleteFileAsync(songPhoto.PublicId, ResourceType.Image);
                    if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                }
                song.Photos.Remove(songPhoto);
            }

            bool isMain = true;
            foreach (var photo in updateSongDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id, photo);

                if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

                var songPhoto = new SongPhoto
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                    IsMain = isMain
                };
                song.Photos.Add(songPhoto);

                isMain = false;
            }
        }


        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to update song.");
        }

        return NoContent();

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

        var albumSongs = await unitOfWork.AlbumSongRepository.GetAlbumSongsAsync(song.Id);
        if (albumSongs != null)
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
            song.Photos.Remove(songPhoto);
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

        return NoContent();
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

        var existingFavoriteSong = await unitOfWork.SongRepository.GetSongFavoriteAsync(songId, userId);
        if (existingFavoriteSong == null)
        {
            var favoriteSong = new SongFavorite
            {
                SongId = songId,
                UserId = userId
            };

            unitOfWork.SongRepository.AddFavoriteUser(favoriteSong);
        }
        else
        {
            unitOfWork.SongRepository.RemoveFavoriteUser(existingFavoriteSong);
        }

        if (await unitOfWork.Complete()) return Ok();

        return BadRequest("Failed to add song to favorite.");
    }

    [HttpGet("is-favorite/{songId:int}")]
    [Authorize]
    public async Task<ActionResult<bool>> IsUserFavorite(int songId)
    {
        int userId = User.GetUserId();

        var favoriteSong = await unitOfWork.SongRepository.GetSongFavoriteAsync(songId, userId);

        return favoriteSong != null;
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
