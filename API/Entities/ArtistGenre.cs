namespace API.Entities;

[Table("ArtistGenres")]
public class ArtistGenre
{
    public int ArtistId { get; set; }
    public AppUser Artist { get; set; } = null!;
    public int GenreId { get; set; }
    public AppGenre Genre { get; set; } = null!;
}
