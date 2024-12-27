using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class ArtistSongRepository(DataContext context) : IArtistSongRepository
{

   public void AddArtistSong(ArtistSong artistSong)
   {
      context.ArtistSongs.Add(artistSong);
   }

   public async Task<List<ArtistSong>?> GetArtistSongsAsync(int songId)
   {
      return await context.ArtistSongs
            .Where(x => x.SongId == songId)
            .ToListAsync();
   }

   public void RemoveArtistSong(ArtistSong artistSong)
   {
      context.ArtistSongs.Remove(artistSong);
   }

   public async Task<bool> SaveChangesAsync()
   {
      return await context.SaveChangesAsync() > 0;
   }
}
