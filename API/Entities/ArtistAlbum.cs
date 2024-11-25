namespace API.Entities;

[Table("ArtistAlbums")]
public class ArtistAlbum
{
    public int ArtistId { get; set; }
    public AppUser Artist { get; set; } = null!;
    public int AlbumId { get; set; }
    public Album Album { get; set; } = null!;
}
