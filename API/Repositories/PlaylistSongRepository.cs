using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class PlaylistSongRepository(DataContext context) : IPlaylistSongRepository
{
   public void AddPlaylistSong(PlaylistSong playlistSong)
   {
      context.PlaylistSongs.Add(playlistSong);
   }

   public async Task<PlaylistSong?> GetPlaylistSongAsync(int playlistId, int songId)
   {
      return await context.PlaylistSongs.FindAsync(playlistId, songId);
   }

   public void RemovePlaylistSong(PlaylistSong playlistSong)
   {
      context.PlaylistSongs.Remove(playlistSong);
   }

   public async Task<bool> SaveChangesAsync()
   {
      return await context.SaveChangesAsync() > 0;
   }
}
