using API.DTOs.Songs;
using API.Interfaces;
using API.Entities;
using API.Extensions;

namespace API.Controllers;

[Authorize]
public class SongsController(
    ISongRepository songRepository,
    IMapper mapper,
    IFileService fileService,
    IPhotoRepository photoRepository
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
            song.MusicUrl = uploadResult.Url.ToString();
            song.MusicPublicId = uploadResult.PublicId;
        }

        if (newSongDto.LyricFile != null)
        {
            var uploadResult = await fileService.UploadLyricAsync("/songs/" + song.Id, newSongDto.LyricFile);
            song.LyricUrl = uploadResult.Url.ToString();
            song.LyricPublicId = uploadResult.PublicId;
        }

        bool isMainSet = false;
        if (newSongDto.PhotoFiles != null)
        {
            foreach (var photo in newSongDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/songs/" + song.Id, photo);

                var newPhoto = await photoRepository.AddPhotoAsync(new Photo
                {
                    Url = uploadResult.Url.ToString(),
                    PublicId = uploadResult.PublicId,
                });

                await songRepository.AddPhotoAsync(song, newPhoto, !isMainSet);

                isMainSet = true;
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


}
