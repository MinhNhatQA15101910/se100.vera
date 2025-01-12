namespace API.Entities;

public class Genre
{
    public int Id { get; set; }
    public required string GenreName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<SongGenre> Songs { get; set; } = [];
    public List<AlbumGenre> Albums { get; set; } = [];
}
