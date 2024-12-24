using API.DTOs.Genres;
using API.Interfaces;

namespace API.Controllers;

public class GenresController(
    IGenreRepository genreRepository,
    IMapper mapper
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<GenreDto>> GetGenreById(int id)
    {
        var genre = await genreRepository.GetGenreByIdAsync(id);
        if (genre == null)
        {
            return NotFound();
        }

        return mapper.Map<GenreDto>(genre);
    }
}
