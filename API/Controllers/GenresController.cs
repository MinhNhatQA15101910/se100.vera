using API.DTOs.Genres;
using API.Entities;
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

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<GenreDto>>> GetAllGenres()
    {
        var genres = await genreRepository.GetAllGenresAsync();

        return Ok(genres);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<GenreDto>> AddGenre(AddUpdateGenreDto newGenreDto)
    {
        // Check if genre already exists
        var existingGenre = await genreRepository.GetGenreByNameAsync(newGenreDto.GenreName);
        if (existingGenre != null)
        {
            return BadRequest("Genre already exists");
        }

        // Add genre
        var genre = mapper.Map<Genre>(newGenreDto);

        genreRepository.AddGenre(genre);

        if (!await genreRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to add genre");
        }

        return CreatedAtAction(
            nameof(GetGenreById),
            new { id = genre.Id },
            mapper.Map<GenreDto>(genre)
        );
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateGenre(int id, AddUpdateGenreDto updateGenreDto)
    {
        var genre = await genreRepository.GetGenreByIdAsync(id);
        if (genre == null)
        {
            return NotFound();
        }

        // Check if genre already exists
        var existingGenre = await genreRepository.GetGenreByNameAsync(updateGenreDto.GenreName);
        if (existingGenre != null && existingGenre.Id != id)
        {
            return BadRequest("Genre already exists");
        }

        mapper.Map(updateGenreDto, genre);
        genre.UpdatedAt = DateTime.UtcNow;

        if (!await genreRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to update genre");
        }

        return NoContent();
    }
}
