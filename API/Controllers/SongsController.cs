using API.DTOs.Songs;
using API.Interfaces;
using API.Entities;
using API.Extensions;
using API.Helpers;

namespace API.Controllers;

[Authorize]
public class SongsController(
    ISongRepository songRepository,
    IMapper mapper,
    IFileService fileService,
    IPhotoRepository photoRepository,
    ISongPhotoRepository songPhotoRepository,
    ISongGenreRepository songGenreRepository

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
        // var genresList = await songGenreRepository.GetSongGenreAsync(id);
        // if (genresList != null)
        // {
        //     song.Genres = genresList.Select(sg => sg.GenreId.ToString()).ToList();
        // }

        return song;
    }

    [HttpPost]
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
                    GenreId = genreId
                };
                songGenreRepository.AddSongGenre(songGenre);
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
    public async Task<ActionResult<SongDto>> UpdateSong([FromForm] NewSongDto newSongDto, int id)
    {
        var song = await songRepository.GetSongByIdAsync(id);

        if (song == null)
        {
            return NotFound();
        }


        if (!await songRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to update song.");
        }

        return CreatedAtAction(
            nameof(GetSongById),
            new { id = song.Id },
            mapper.Map<SongDto>(song)
        );

    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs([FromQuery] SongParams songParams)
    {
        var songs = await songRepository.GetSongsAsync(songParams);

        Response.AddPaginationHeader(songs);

        return Ok(songs);
    }

}
