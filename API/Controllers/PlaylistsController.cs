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
   [Authorize]
   public async Task<ActionResult<PlaylistDto>> GetPlaylistById(int id)
   {
      // Check playlist
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound();
      }

      // Check user role
      var userId = User.GetUserId();
      var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
      if (user == null)
      {
         return Unauthorized("Invalid user.");
      }
      if (!User.IsInRole("Admin") && userId != playlist.PublisherId)
      {
         return Unauthorized("Unauthorized user.");
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

      var userId = User.GetUserId();
      var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
      if (user == null)
      {
         return Unauthorized("Invalid user.");
      }

      if (!User.IsInRole("Admin"))
      {
         playlistParams.PublisherId = User.GetUserId().ToString();
      }

      var playlists = await unitOfWork.PlaylistRepository.GetPlaylistsAsync(playlistParams);

      Response.AddPaginationHeader(playlists);

      return Ok(playlists);
   }

   [HttpPost]
   [Authorize]
   public async Task<ActionResult<PlaylistDto>> CreatePlaylist([FromForm] NewPlaylistDto newPlaylistDto)
   {
      if (newPlaylistDto == null)
      {
         return BadRequest("Invalid playlist data.");
      }

      var userId = User.GetUserId();
      newPlaylistDto.PublisherId = userId;

      var existingPlaylist = await unitOfWork.PlaylistRepository.GetPlaylistByNameAsync(userId, newPlaylistDto.PlaylistName);
      if (existingPlaylist != null)
      {
         return BadRequest("Playlist name already exists.");
      }

      var playlist = mapper.Map<Playlist>(newPlaylistDto);

      unitOfWork.PlaylistRepository.CreatePlaylist(playlist);

      if (!await unitOfWork.Complete())
      {
         return BadRequest("Failed to create playlist.");
      }

      return mapper.Map<PlaylistDto>(playlist);
   }

   [HttpPut("{id:int}")]
   [Authorize]
   public async Task<ActionResult<PlaylistDto>> UpdatePlaylist(int id, UpdatePlaylistDto updatePlaylistDto)
   {
      if (updatePlaylistDto == null)
      {
         return BadRequest("Invalid playlist data.");
      }

      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (playlist.PublisherId != userId && !User.IsInRole("Admin"))
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      if (updatePlaylistDto.PlaylistName != null)
      {
         var existingPlaylist = await unitOfWork.PlaylistRepository.GetPlaylistByNameAsync(playlist.PublisherId, updatePlaylistDto.PlaylistName);
         if (existingPlaylist != null && existingPlaylist.Id != playlist.Id)
         {
            return BadRequest("Playlist name already exists.");
         }
      }

      mapper.Map(updatePlaylistDto, playlist);

      // Update timestamp
      playlist.UpdatedAt = DateTime.UtcNow;

      if (!await unitOfWork.Complete())
      {
         return BadRequest("Failed to update playlist.");
      }

      return NoContent();
   }

   [HttpPut("add-song/{id:int}")]
   [Authorize]
   public async Task<ActionResult> AddSongToPlaylist(int id, AddRemovePlaylistSongDto addRemovePlaylistSongDto)
   {
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (!User.IsInRole("Admin") && playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      var song = await unitOfWork.SongRepository.GetSongByIdAsync(addRemovePlaylistSongDto.SongId);
      if (song == null)
      {
         return NotFound("Song not found.");
      }

      var existingPlaylistSong = playlist.Songs.FirstOrDefault(ps => ps.SongId == song.Id);
      if (existingPlaylistSong != null)
      {
         return BadRequest("Song already exists in the playlist.");
      }

      playlist.Songs.Add(new PlaylistSong
      {
         PlaylistId = playlist.Id,
         SongId = song.Id
      });

      // Update total songs
      playlist.TotalSongs++;

      // Update timestamp
      playlist.UpdatedAt = DateTime.UtcNow;

      if (await unitOfWork.Complete())
      {
         return NoContent();
      }

      return BadRequest("Failed to add song to playlist.");
   }

   [HttpPut("remove-song/{id:int}")]
   [Authorize]
   public async Task<ActionResult<PlaylistDto>> RemoveSongFromPlaylist(int id, AddRemovePlaylistSongDto addRemovePlaylistSongDto)
   {
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (!User.IsInRole("Admin") && playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      var song = await unitOfWork.SongRepository.GetSongByIdAsync(addRemovePlaylistSongDto.SongId);
      if (song == null)
      {
         return NotFound("Song not found.");
      }

      var existingPlaylistSong = playlist.Songs.FirstOrDefault(ps => ps.SongId == song.Id);
      if (existingPlaylistSong == null)
      {
         return BadRequest("Song does not exist in the playlist.");
      }

      playlist.Songs.Remove(existingPlaylistSong);

      // Update total songs
      playlist.TotalSongs--;

      // Update timestamp
      playlist.UpdatedAt = DateTime.UtcNow;

      if (!await unitOfWork.Complete())
      {
         return BadRequest("Failed to remove song from playlist.");
      }

      return NoContent();
   }

   [HttpDelete("{id:int}")]
   [Authorize]
   public async Task<ActionResult> DeletePlaylist(int id)
   {
      var playlist = await unitOfWork.PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (!User.IsInRole("Admin") && playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      unitOfWork.PlaylistRepository.RemovePlaylist(playlist);

      if (!await unitOfWork.Complete())
      {
         return BadRequest("Failed to delete playlist.");
      }

      return Ok();
   }
}
