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
    ISongPhotoRepository songPhotoRepository
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

    // [HttpPut("{id:int}")]
    // public async Task<ActionResult<SongDto>> UpdateSong([FromForm] NewSongDto newSongDto, int id)
    // {
    //     var song = await songRepository.GetSongByIdAsync(id);
    //     if (song == null)
    //     {
    //         return NotFound();
    //     }

    //     if (newSongDto == null)
    //     {
    //         return BadRequest("Invalid song data.");
    //     }

    //     mapper.Map(newSongDto, song);


    //     if (!await songRepository.SaveChangesAsync())
    //     {
    //         return BadRequest("Failed to update song.");
    //     }

    //     return CreatedAtAction(
    //         nameof(GetSongById),
    //         new { id = song.Id },
    //         mapper.Map<SongDto>(song)
    //     );

    // }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetSongs([FromQuery] SongParams songParams)
    {
        var songs = await songRepository.GetSongsAsync(songParams);

        Response.AddPaginationHeader(songs);

        return Ok(songs);
    }

}
