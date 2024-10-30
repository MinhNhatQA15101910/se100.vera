namespace API.Entities;

[Table("AlbumGenres")]
public class AlbumGenre
{
    public int AlbumId { get; set; }
    public AppAlbum Album { get; set; } = null!;
    public int GenreId { get; set; }
    public AppGenre Genre { get; set; } = null!;
}
