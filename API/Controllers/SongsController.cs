using API.DTOs.Songs;
using API.Interfaces;
using API.Entities;
using API.Extensions;
using API.Helpers;

namespace API.Controllers;

public class SongsController(
    ISongRepository songRepository,
    IMapper mapper,
    IFileService fileService,
    IAlbumSongRepository albumSongRepository,
    IArtistSongRepository artistSongRepository,
    IGenreRepository genreRepository,
    IPhotoRepository photoRepository,
    IPlaylistSongRepository playlistSongRepository,
    ISongPhotoRepository songPhotoRepository,
    ISongGenreRepository songGenreRepository,
    IUserRepository userRepository
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
                var artist = await userRepository.GetUserByIdAsync(artistId);
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
                var genre = await genreRepository.GetGenreByIdAsync(genreId);
                if (genre == null)
                {
                    return BadRequest("Invalid genre id.");
                }
            }
        }

        var song = await songRepository.AddSongAsync(newSongDto);

        var publisher = await userRepository.GetUserByIdAsync(userId);
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
            songGenreRepository.AddSongGenre(songGenre);
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
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<SongDto>> UpdateSong([FromForm] UpdateSongDto updateSongDto, int id)
    {
        var userId = User.GetUserId();
        updateSongDto.PublisherId = userId;

        var song = await songRepository.GetSongByIdAsync(id);

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
                var genre = await genreRepository.GetGenreByIdAsync(genreId);
                if (genre == null)
                {
                    return BadRequest("Invalid genre id.");
                }
            }
        }

        mapper.Map(updateSongDto, song);

        var songGenres = await songGenreRepository.GetSongGenresAsync(song.Id);
        if (songGenres != null)
        {
            foreach (var songGenre in songGenres)
            {
                songGenreRepository.RemoveSongGenre(songGenre);
            }
        }
        foreach (var genreId in updateSongDto.GenreIds)
        {
            var songGenre = new SongGenre
            {
                SongId = song.Id,
                GenreId = genreId
            };
            songGenreRepository.AddSongGenre(songGenre);
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
                            var deleteResult = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
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
                            var deleteResult = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
                            if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                        }
                        photoRepository.RemovePhoto(photo);
                    }
                    songPhotoRepository.RemoveSongPhoto(songPhoto);
                }
            }
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

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Artist, Admin")]
    public async Task<ActionResult> DeleteSong(int id)
    {
        var song = await songRepository.GetSongByIdAsync(id);

        if (song == null)
        {
            return NotFound();
        }

        var albumSongs = await albumSongRepository.GetAlbumSongsAsync(song.Id);
        if (albumSongs != null)
        {
            return BadRequest("Song is in an album.");
        }

        var playlistSongs = await playlistSongRepository.GetPlaylistSongsAsync(song.Id);
        if (playlistSongs != null)
        {
            foreach (var playlistSong in playlistSongs)
            {
                playlistSongRepository.RemovePlaylistSong(playlistSong);
            }
        }

        var artistSongs = await artistSongRepository.GetArtistSongsAsync(song.Id);
        if (artistSongs != null)
        {
            foreach (var artistSong in artistSongs)
            {
                artistSongRepository.RemoveArtistSong(artistSong);
            }
        }

        var songGenres = await songGenreRepository.GetSongGenresAsync(song.Id);
        if (songGenres != null)
        {
            foreach (var songGenre in songGenres)
            {
                songGenreRepository.RemoveSongGenre(songGenre);
            }
        }

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
                        var deleteResult = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
                        if (deleteResult.Error != null) return BadRequest("Delete photo file from cloudinary failed: " + deleteResult.Error.Message);
                    }
                    photoRepository.RemovePhoto(photo);
                }
                songPhotoRepository.RemoveSongPhoto(songPhoto);
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

        songRepository.RemoveSong(song);

        if (!await songRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to delete song.");
        }

        return NoContent();
    }
}
