using API.DTOs.Playlists;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class PlaylistsController(
   IUnitOfWork unitOfWork,
   IMapper mapper
) : BaseApiController
{
   [HttpGet("{id:int}")]
   public async Task<ActionResult<PlaylistDto>> GetPlaylistById(int id)
   {
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound();
      }

      return mapper.Map<PlaylistDto>(playlist);
   }

   [HttpGet]
   public async Task<ActionResult<IEnumerable<PlaylistDto>>> GetPlaylists([FromQuery] PlaylistParams playlistParams)
   {
      if (playlistParams.PageNumber < 1 || playlistParams.PageSize < 1)
      {
         return BadRequest("Invalid page number or page size.");
      }
      if (playlistParams.PublisherId != null && !int.TryParse(playlistParams.PublisherId, out _))
      {
         return BadRequest("Invalid publisher id.");
      }
      var playlists = await unitOfWork.PlaylistRepository.GetPlaylistsAsync(playlistParams);

      Response.AddPaginationHeader(playlists);

      return Ok(playlists);
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

      var playlist = await unitOfWork.PlaylistRepository.CreatePlaylistAsync(newPlaylistDto);

      return mapper.Map<PlaylistDto>(playlist);
   }

   [HttpPut("add-song/{id:int}")]
   [Authorize(Roles = "Listener, Artist")]
   public async Task<ActionResult<PlaylistDto>> AddSongToPlaylist(int id, AddRemovePlaylistSongDto addRemovePlaylistSongDto)
   {
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      var song = await unitOfWork.SongRepository.GetSongByIdAsync(addRemovePlaylistSongDto.SongId);
      if (song == null)
      {
         return NotFound("Song not found.");
      }

      var playlistSong = await unitOfWork.PlaylistSongRepository.GetPlaylistSongAsync(id, song.Id);
      if (playlistSong != null)
      {
         return BadRequest("Song already exists in the playlist.");
      }

      unitOfWork.PlaylistSongRepository.AddPlaylistSong(new PlaylistSong
      {
         PlaylistId = playlist.Id,
         SongId = song.Id
      });

      if (await unitOfWork.Complete())
      {
         return mapper.Map<PlaylistDto>(playlist);
      }

      return BadRequest("Failed to add song to playlist.");
   }

   [HttpPut("remove-song/{id:int}")]
   [Authorize(Roles = "Listener, Artist")]
   public async Task<ActionResult<PlaylistDto>> RemoveSongFromPlaylist(int id, AddRemovePlaylistSongDto addRemovePlaylistSongDto)
   {
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      var song = await unitOfWork.SongRepository.GetSongByIdAsync(addRemovePlaylistSongDto.SongId);
      if (song == null)
      {
         return NotFound("Song not found.");
      }

      var playlistSong = await unitOfWork.PlaylistSongRepository.GetPlaylistSongAsync(id, song.Id);
      if (playlistSong == null)
      {
         return BadRequest("Song does not exist in the playlist.");
      }

      unitOfWork.PlaylistSongRepository.RemovePlaylistSong(playlistSong);

      if (await unitOfWork.Complete())
      {
         return mapper.Map<PlaylistDto>(playlist);
      }

      return BadRequest("Failed to remove song from playlist.");
   }
}
