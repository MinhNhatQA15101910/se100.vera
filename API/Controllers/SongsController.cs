using API.DTOs.Songs;
using API.Interfaces;

namespace API.Controllers;

public class SongsController(ISongRepository songRepository, IFileService fileService, IMapper mapper): BaseApiController
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
    public async Task<ActionResult<SongDto>> AddSong(NewSongDto newSongDto)
    {
        var song = await songRepository.AddSongAsync(newSongDto);

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
