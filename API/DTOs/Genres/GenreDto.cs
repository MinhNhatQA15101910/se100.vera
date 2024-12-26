namespace API.DTOs.Genres;

public class GenreDto
{
    public int Id { get; set; }
    public required string GenreName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
