namespace API.Entities;

public class AppGenre
{
    public int Id { get; set; }
    public required string GenreName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<SongGenre> Songs { get; set; } = [];
    public List<AlbumGenre> Albums { get; set; } = [];
    public List<ArtistGenre> Artists { get; set; } = [];
}
