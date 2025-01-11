using API.Data;
using API.Entities;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class SongGenreRepository(DataContext context) : ISongGenreRepository
{
   public async Task<List<SongGenre>?> GetSongGenresBySongIdAsync(int songId)
   {
      return await context.SongGenres
            .Where(sg => sg.SongId == songId)
            .ToListAsync();
   }
   public async Task<List<SongGenre>?> GetSongGenresByGenreIdAsync(int genreId)
   {
      return await context.SongGenres
            .Where(sg => sg.GenreId == genreId)
            .ToListAsync();
   }

   public void RemoveSongGenre(SongGenre songGenre)
   {
      context.SongGenres.Remove(songGenre);
   }
}
