using API.DTOs.Genres;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class GenresController(
    IUnitOfWork unitOfWork,
    IMapper mapper
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<GenreDto>> GetGenreById(int id)
    {
        var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(id);
        if (genre == null)
        {
            return NotFound();
        }

        return mapper.Map<GenreDto>(genre);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GenreDto>>> GetGenres([FromQuery] PaginationParams paginationParams)
    {
        var genres = await unitOfWork.GenreRepository.GetGenresAsync(paginationParams);

        Response.AddPaginationHeader(genres);

        return Ok(genres);
    }

    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<GenreDto>>> GetAllGenres()
    {
        var genres = await unitOfWork.GenreRepository.GetAllGenresAsync();

        return Ok(genres);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<GenreDto>> AddGenre(AddUpdateGenreDto newGenreDto)
    {
        // Check if genre already exists
        var existingGenre = await unitOfWork.GenreRepository.GetGenreByNameAsync(newGenreDto.GenreName);
        if (existingGenre != null)
        {
            return BadRequest("Genre already exists");
        }

        // Add genre
        var genre = mapper.Map<Genre>(newGenreDto);

        unitOfWork.GenreRepository.AddGenre(genre);

        if (!await unitOfWork.Complete())
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
        var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(id);
        if (genre == null)
        {
            return NotFound();
        }

        // Check if genre already exists
        var existingGenre = await unitOfWork.GenreRepository.GetGenreByNameAsync(updateGenreDto.GenreName);
        if (existingGenre != null && existingGenre.Id != id)
        {
            return BadRequest("Genre already exists");
        }

        mapper.Map(updateGenreDto, genre);
        genre.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to update genre");
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteGenre(int id)
    {
        var genre = await unitOfWork.GenreRepository.GetGenreByIdAsync(id);
        if (genre == null)
        {
            return NotFound();
        }

        var songGenres = await unitOfWork.SongGenreRepository.GetSongGenresByGenreIdAsync(id);
        if (songGenres != null)
        {
            return BadRequest("Genre is associated with songs");
        }

        unitOfWork.GenreRepository.RemoveGenre(genre);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to delete genre");
        }

        return NoContent();
    }
}
