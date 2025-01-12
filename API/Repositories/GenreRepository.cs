using API.Data;
using API.DTOs.Genres;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class GenreRepository(DataContext context, IMapper mapper) : IGenreRepository
{
   public void AddGenre(Genre genre)
   {
      context.Genres.Add(genre);
   }

   public void RemoveGenre(Genre genre)
   {
      context.Genres.Remove(genre);
   }

   public async Task<IEnumerable<GenreDto>> GetAllGenresAsync()
   {
      return await context.Genres
         .ProjectTo<GenreDto>(mapper.ConfigurationProvider)
         .ToListAsync();
   }

   public async Task<Genre?> GetGenreByIdAsync(int id)
   {
      return await context.Genres
         .Include(g => g.Songs)
         .Include(g => g.Albums)
         .FirstOrDefaultAsync(g => g.Id == id);
   }

   public async Task<Genre?> GetGenreByNameAsync(string name)
   {
      return await context.Genres
        .SingleOrDefaultAsync(s => s.GenreName.ToUpper() == name.ToUpper());
   }

   public async Task<PagedList<GenreDto>> GetGenresAsync(PaginationParams paginationParams)
   {
      var query = context.Genres.AsQueryable();

      query = query.OrderBy(g => g.GenreName);

      return await PagedList<GenreDto>.CreateAsync(
         query.ProjectTo<GenreDto>(mapper.ConfigurationProvider),
         paginationParams.PageNumber,
         paginationParams.PageSize
      );
   }

   public async Task<int> GetTotalGenresAsync()
   {
      return await context.Genres.CountAsync();
   }
}
