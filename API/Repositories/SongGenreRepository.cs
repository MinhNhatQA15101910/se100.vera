
using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class SongGenreRepository(DataContext context) : ISongGenreRepository
{
   public void AddSongGenre(SongGenre songGenre)
   {
      context.SongGenres.Add(songGenre);
   }

   public async Task<List<SongGenre>?> GetSongGenreAsync(int songId)
   {
      return await context.SongGenres
            .Where(sg => sg.SongId == songId)
            .ToListAsync();
   }

   public void RemoveSongGenre(SongGenre songGenre)
   {
      context.SongGenres.Remove(songGenre);
   }

   public async Task<bool> SaveChangesAsync()
   {
      return await context.SaveChangesAsync() > 0;
   }
}
