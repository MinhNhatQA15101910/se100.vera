using API.DTOs.Playlists;
using API.Entities;
using API.Extensions;
using API.Interfaces;

namespace API.Controllers;

public class PlaylistController(
   IPlaylistRepository PlaylistRepository,
   ISongRepository songRepository,
   IPhotoRepository photoRepository,
   IFileService fileService,
   IMapper mapper
) : BaseApiController
{
   [HttpGet("{id:int}")]
   public async Task<ActionResult<PlaylistDto>> GetPlaylistById(int id)
   {
      var playlist = await PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound();
      }

      return mapper.Map<PlaylistDto>(playlist);
   }

   [HttpPost]
   [Authorize(Roles = "Listener, Artist")]
   public async Task<ActionResult<PlaylistDto>> CreatePlaylist([FromForm] NewPlaylistDto newPlaylistDto)
   {
      if (newPlaylistDto == null)
      {
         return BadRequest("Invalid playlist data.");
      }

      var userId = User.GetUserId();
      newPlaylistDto.PublisherId = userId;

      var playlist = await PlaylistRepository.CreatePlaylistAsync(newPlaylistDto);

      return mapper.Map<PlaylistDto>(playlist);
   }

}
