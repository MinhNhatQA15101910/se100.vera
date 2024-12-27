using API.DTOs.Albums;
using API.DTOs.Playlists;
using API.Entities;
using API.Extensions;
using API.Interfaces;

namespace API.Controllers;

public class PlaylistsController(
   IPlaylistRepository PlaylistRepository,
   IPlaylistSongRepository playlistSongRepository,
   ISongRepository songRepository,
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

   [HttpPut("add-song/{id:int}")]
   [Authorize(Roles = "Listener, Artist")]
   public async Task<ActionResult<PlaylistDto>> AddSongToPlaylist(int id, AddRemovePlaylistSongDto addRemovePlaylistSongDto)
   {
      var playlist = await PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      var song = await songRepository.GetSongByIdAsync(addRemovePlaylistSongDto.SongId);
      if (song == null)
      {
         return NotFound("Song not found.");
      }

      var playlistSong = await playlistSongRepository.GetPlaylistSongAsync(id, song.Id);
      if (playlistSong != null)
      {
         return BadRequest("Song already exists in the playlist.");
      }

      playlistSongRepository.AddPlaylistSong(new PlaylistSong
      {
         PlaylistId = playlist.Id,
         SongId = song.Id
      });

      if (await playlistSongRepository.SaveChangesAsync())
      {
         return mapper.Map<PlaylistDto>(playlist);
      }

      return BadRequest("Failed to add song to playlist.");
   }

   [HttpPut("remove-song/{id:int}")]
   [Authorize(Roles = "Listener, Artist")]
   public async Task<ActionResult<PlaylistDto>> RemoveSongFromPlaylist(int id, AddRemovePlaylistSongDto addRemovePlaylistSongDto)
   {
      var playlist = await PlaylistRepository.GetPlaylistByIdAsync(id);
      if (playlist == null)
      {
         return NotFound("Playlist not found.");
      }

      var userId = User.GetUserId();
      if (playlist.PublisherId != userId)
      {
         return Unauthorized("The playlist does not belong to you.");
      }

      var song = await songRepository.GetSongByIdAsync(addRemovePlaylistSongDto.SongId);
      if (song == null)
      {
         return NotFound("Song not found.");
      }

      var playlistSong = await playlistSongRepository.GetPlaylistSongAsync(id, song.Id);
      if (playlistSong == null)
      {
         return BadRequest("Song does not exist in the playlist.");
      }

      playlistSongRepository.RemovePlaylistSong(playlistSong);

      if (await playlistSongRepository.SaveChangesAsync())
      {
         return mapper.Map<PlaylistDto>(playlist);
      }

      return BadRequest("Failed to remove song from playlist.");
   }

}
