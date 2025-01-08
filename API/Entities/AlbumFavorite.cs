namespace API.Entities;

public class AlbumFavorite
{
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int AlbumId { get; set; }
    public Album Album { get; set; } = null!;
}
