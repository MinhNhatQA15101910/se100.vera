using API.Entities;
namespace API.Interfaces;

public interface IGenreRepository
{
   Task<Genre> GetGenreByIdAsync(int id);
   Task<List<Genre>> GetGenresAsync();
   Task<Genre> AddGenreAsync(Genre genre);
   Task<bool> DeleteGenreAsync(int id);
   Task<bool> SaveChangesAsync();
}
