using API.DTOs.Songs;
using API.Interfaces;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Repositories;

namespace API.Controllers;

public class SongsController(
    ISongRepository songRepository,
    IMapper mapper,
    IFileService fileService,
    IPhotoRepository photoRepository,
    ISongPhotoRepository songPhotoRepository,
    ISongGenreRepository songGenreRepository,
    IGenreRepository genreRepository
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<SongDto>> GetSongById(int id)
    {
        var song = await songRepository.GetSongByIdAsync(id);
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

        var song = await songRepository.AddSongAsync(newSongDto);

        if (newSongDto.MusicFile != null)
        {
            var uploadResult = await fileService.UploadAudioAsync("/songs/" + song.Id, newSongDto.MusicFile);

            if (uploadResult.Error != null) return BadRequest("Upload song file to cloudinary failed: " + uploadResult.Error.Message);

            song.MusicUrl = uploadResult.Url.ToString();
            song.MusicPublicId = uploadResult.PublicId;
        }
        else
        {
            return BadRequest("Song file is required.");
        }

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
                await photoRepository.AddPhotoAsync(newPhoto);

                var songPhoto = new SongPhoto
                {
                    PhotoId = newPhoto.Id,
                    SongId = song.Id,
                    IsMain = isMain
                };
                songPhotoRepository.AddSongPhoto(songPhoto);
                isMain = false;
            }
        }

        if (newSongDto.GenresId != null)
        {
            foreach (var genreId in newSongDto.GenresId)
            {
                var songGenre = new SongGenre
                {
                    SongId = song.Id,
                    GenreId = genreId,
                    Genre = await genreRepository.GetGenreByIdAsync(genreId)
                };
                songGenreRepository.AddSongGenre(songGenre);
            }
        }
        else
        {
            return BadRequest("At least one song genres is required.");
        }

        if (!await songRepository.SaveChangesAsync())
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
    public async Task<ActionResult<SongDto>> UpdateSong([FromForm] UpdateSongDto updateSongDto, int id)
    {
        var userId = User.GetUserId();
        updateSongDto.PublisherId = userId;

        var song = await songRepository.GetSongByIdAsync(id);

        if (song == null)
        {
            return NotFound();
        }

        mapper.Map(updateSongDto, song);

        if (updateSongDto.MusicFile != null)
        {
            if (song.MusicPublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(song.MusicPublicId);
                if (deleteResult.Error != null) return BadRequest("Delete song file from cloudinary failed: " + deleteResult.Error.Message);
            }

            var uploadResult = await fileService.UploadAudioAsync("/songs/" + song.Id, updateSongDto.MusicFile);

            if (uploadResult.Error != null) return BadRequest("Upload song file to cloudinary failed: " + uploadResult.Error.Message);

            song.MusicUrl = uploadResult.Url.ToString();
            song.MusicPublicId = uploadResult.PublicId;
        }
        else
        {
            return BadRequest("Song file is required.");
        }

        if (updateSongDto.LyricFile != null)
        {
            if (song.LyricPublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(song.LyricPublicId);
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
            var songPhotos = await songPhotoRepository.GetSongPhotoAsync(song.Id);
            if (songPhotos != null)
            {
                foreach (var songPhoto in songPhotos)
                {
                    var photo = await photoRepository.GetPhotoByIdAsync(songPhoto.PhotoId);
                    if (photo != null)
                    {
                        if (photo.PublicId != null)
                        {
                            var deleteResult = await fileService.DeleteFileAsync(photo.PublicId);
                            if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                        }
                        photoRepository.RemovePhoto(photo);
                    }
                    songPhotoRepository.RemoveSongPhoto(songPhoto);
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
                await photoRepository.AddPhotoAsync(newPhoto);

                var songPhoto = new SongPhoto
                {
                    PhotoId = newPhoto.Id,
                    SongId = song.Id,
                    IsMain = isMain
                };
                songPhotoRepository.AddSongPhoto(songPhoto);
                isMain = false;
            }
        }
        else
        {
            var songPhotos = await songPhotoRepository.GetSongPhotoAsync(song.Id);
            if (songPhotos != null)
            {
                foreach (var songPhoto in songPhotos)
                {
                    var photo = await photoRepository.GetPhotoByIdAsync(songPhoto.PhotoId);
                    if (photo != null)
                    {
                        if (photo.PublicId != null)
                        {
                            var deleteResult = await fileService.DeleteFileAsync(photo.PublicId);
                            if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                        }
                        photoRepository.RemovePhoto(photo);
                    }
                    songPhotoRepository.RemoveSongPhoto(songPhoto);
                }
            }
        }

        if (updateSongDto.GenresId != null)
        {
            var songGenres = await songGenreRepository.GetSongGenreAsync(song.Id);
            if (songGenres != null)
            {
                foreach (var songGenre in songGenres)
                {
                    songGenreRepository.RemoveSongGenre(songGenre);
                }
            }
            foreach (var genreId in updateSongDto.GenresId)
            {
                var songGenre = new SongGenre
                {
                    SongId = song.Id,
                    GenreId = genreId
                };
                songGenreRepository.AddSongGenre(songGenre);
            }
        }
        else
        {
            return BadRequest("At least one song genres is required.");
        }

        if (!await songRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to update song.");
        }

        return NoContent();

    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs([FromQuery] SongParams songParams)
    {
        var songs = await songRepository.GetSongsAsync(songParams);

        Response.AddPaginationHeader(songs);

        return Ok(songs);
    }

}
