using API.Entities;

namespace API.Interfaces;

public interface IPlaylistSongRepository
{
   void AddPlaylistSong(PlaylistSong playlistSong);
   Task<PlaylistSong?> GetPlaylistSongAsync(int playlistId, int songId);
   void RemovePlaylistSong(PlaylistSong playlistSong);
   Task<bool> SaveChangesAsync();
}
