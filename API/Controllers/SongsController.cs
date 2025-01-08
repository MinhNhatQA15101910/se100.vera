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

        var uploadAudioResult = await fileService.UploadAudioAsync("/songs/" + song.Id, newSongDto.MusicFile);

        if (uploadAudioResult.Error != null)
            return BadRequest("Upload song file to cloudinary failed: " + uploadAudioResult.Error.Message);

        song.MusicUrl = uploadAudioResult.Url.ToString();
        song.MusicPublicId = uploadAudioResult.PublicId;

        if (newSongDto.LyricFile != null)
        {
            var uploadResult = await fileService.UploadLyricAsync("/songs/" + song.Id, newSongDto.LyricFile);

            if (uploadResult.Error != null) return BadRequest("Upload lyric file to cloudinary failed: " + uploadResult.Error.Message);

            song.LyricUrl = uploadResult.Url.ToString();
            song.LyricPublicId = uploadResult.PublicId;
        }

        bool isMain = true;
        if (newSongDto.PhotoFiles != null)
        {
            foreach (var photo in newSongDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id, photo);

                if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

                var newPhoto = new Photo
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                };
                await unitOfWork.PhotoRepository.AddPhotoAsync(newPhoto);

                var songPhoto = new SongPhoto
                {
                    PhotoId = newPhoto.Id,
                    SongId = song.Id,
                    IsMain = isMain
                };
                unitOfWork.SongPhotoRepository.AddSongPhoto(songPhoto);
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

        if (updateSongDto.MusicFile == null)
        {
            return BadRequest("Song file is required.");
        }

        if (updateSongDto.GenreIds == null)
        {
            return BadRequest("At least one genre is required.");
        }
        else
        {
            foreach (var genreId in updateSongDto.GenreIds)
            {
                var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(genreId);
                if (genre == null)
                {
                    return BadRequest("Invalid genre id.");
                }
            }
        }

        mapper.Map(updateSongDto, song);

        var songGenres = await unitOfWork.SongGenreRepository.GetSongGenresAsync(song.Id);
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

        if (song.MusicPublicId != null)
        {
            var deleteResult = await fileService.DeleteFileAsync(song.MusicPublicId, ResourceType.Video);
            if (deleteResult.Error != null) return BadRequest("Delete song file from cloudinary failed: " + deleteResult.Error.Message);
        }

        var uploadAudioResult = await fileService.UploadAudioAsync("/songs/" + song.Id, updateSongDto.MusicFile);

        if (uploadAudioResult.Error != null) return BadRequest("Upload song file to cloudinary failed: " + uploadAudioResult.Error.Message);

        song.MusicUrl = uploadAudioResult.Url.ToString();
        song.MusicPublicId = uploadAudioResult.PublicId;

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
        else
        {
            song.LyricUrl = null;
            song.LyricPublicId = null;
        }

        if (updateSongDto.PhotoFiles != null)
        {
            var songPhotos = await unitOfWork.SongPhotoRepository.GetSongPhotoAsync(song.Id);
            if (songPhotos != null)
            {
                foreach (var songPhoto in songPhotos)
                {
                    var photo = await unitOfWork.PhotoRepository.GetPhotoByIdAsync(songPhoto.PhotoId);
                    if (photo != null)
                    {
                        if (photo.PublicId != null)
                        {
                            var deleteResult = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
                            if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                        }
                        unitOfWork.PhotoRepository.RemovePhoto(photo);
                    }
                    unitOfWork.SongPhotoRepository.RemoveSongPhoto(songPhoto);
                }
            }
            bool isMain = true;
            foreach (var photo in updateSongDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id, photo);

                if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

                var newPhoto = new Photo
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                };
                await unitOfWork.PhotoRepository.AddPhotoAsync(newPhoto);

                var songPhoto = new SongPhoto
                {
                    PhotoId = newPhoto.Id,
                    SongId = song.Id,
                    IsMain = isMain
                };
                unitOfWork.SongPhotoRepository.AddSongPhoto(songPhoto);
                isMain = false;
            }
        }
        else
        {
            var songPhotos = await unitOfWork.SongPhotoRepository.GetSongPhotoAsync(song.Id);
            if (songPhotos != null)
            {
                foreach (var songPhoto in songPhotos)
                {
                    var photo = await unitOfWork.PhotoRepository.GetPhotoByIdAsync(songPhoto.PhotoId);
                    if (photo != null)
                    {
                        if (photo.PublicId != null)
                        {
                            var deleteResult = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
                            if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                        }
                        unitOfWork.PhotoRepository.RemovePhoto(photo);
                    }
                    unitOfWork.SongPhotoRepository.RemoveSongPhoto(songPhoto);
                }
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

        var playlistSongs = await unitOfWork.PlaylistSongRepository.GetPlaylistSongsAsync(song.Id);
        if (playlistSongs != null)
        {
            foreach (var playlistSong in playlistSongs)
            {
                unitOfWork.PlaylistSongRepository.RemovePlaylistSong(playlistSong);
            }
        }

        var artistSongs = await unitOfWork.ArtistSongRepository.GetArtistSongsAsync(song.Id);
        if (artistSongs != null)
        {
            foreach (var artistSong in artistSongs)
            {
                unitOfWork.ArtistSongRepository.RemoveArtistSong(artistSong);
            }
        }

        var songGenres = await unitOfWork.SongGenreRepository.GetSongGenresAsync(song.Id);
        if (songGenres != null)
        {
            foreach (var songGenre in songGenres)
            {
                unitOfWork.SongGenreRepository.RemoveSongGenre(songGenre);
            }
        }

        var songPhotos = await unitOfWork.SongPhotoRepository.GetSongPhotoAsync(song.Id);
        if (songPhotos != null)
        {
            foreach (var songPhoto in songPhotos)
            {
                var photo = await unitOfWork.PhotoRepository.GetPhotoByIdAsync(songPhoto.PhotoId);
                if (photo != null)
                {
                    if (photo.PublicId != null)
                    {
                        var deleteResult = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
                        if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                    }
                    unitOfWork.PhotoRepository.RemovePhoto(photo);
                }
                unitOfWork.SongPhotoRepository.RemoveSongPhoto(songPhoto);
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

        return NoContent();
    }
}
