using API.Interfaces;
using API.Entities;
using API.Data;

namespace API.Repositories;

public class GenreRepository(DataContext context) : IGenreRepository
{
   public async Task<Genre> AddGenreAsync(Genre genre)
   {
      await context.Genres.AddAsync(genre);
      await context.SaveChangesAsync();

      return genre;
   }

   public Task<bool> DeleteGenreAsync(int id)
   {
      throw new NotImplementedException();
   }

   public async Task<Genre?> GetGenreByIdAsync(int id)
   {
      return await context.Genres.FindAsync(id);
   }

   public async Task<List<Genre>> GetGenresAsync()
   {
      return await context.Genres.ToListAsync();
   }

   public async Task<bool> SaveChangesAsync()
   {
      return await context.SaveChangesAsync() > 0;
   }
}
