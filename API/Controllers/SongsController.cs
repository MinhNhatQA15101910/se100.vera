using API.DTOs.Songs;
using API.Interfaces;

namespace API.Controllers;

public class SongsController(ISongRepository songRepository): BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<SongDto>> GetSongById(int id)
    {
        var song = await songRepository.GetSongById(id);
        if (song == null)
        {
            return NotFound();
        }

        return song;
    }
}
