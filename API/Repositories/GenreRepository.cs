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

   public async Task<Genre> GetGenreByIdAsync(int id)
   {

      var genre = await context.Genres.FindAsync(id);
      if (genre == null)
      {
         throw new KeyNotFoundException($"Genre with id {id} not found.");
      }
      return genre;
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
