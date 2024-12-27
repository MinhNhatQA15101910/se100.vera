using API.Data;
using API.DTOs.Genres;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Repositories;

public class GenreRepository(DataContext context, IMapper mapper) : IGenreRepository
{
   public void AddGenre(Genre genre)
   {
      context.Genres.Add(genre);
   }

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

   public async Task<IEnumerable<GenreDto>> GetAllGenresAsync()
   {
      return await context.Genres
         .ProjectTo<GenreDto>(mapper.ConfigurationProvider)
         .ToListAsync();
   }

   public async Task<Genre?> GetGenreByIdAsync(int id)
   {
      return await context.Genres.FindAsync(id);
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

   public async Task<bool> SaveChangesAsync()
   {
      return await context.SaveChangesAsync() > 0;
   }
}
