using API.DTOs.Genres;
using API.Extensions;
using API.Helpers;
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GenreDto>>> GetGenres([FromQuery] PaginationParams paginationParams)
    {
        var genres = await genreRepository.GetGenresAsync(paginationParams);

        Response.AddPaginationHeader(genres);

        return Ok(genres);
    }
}
