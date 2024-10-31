namespace API.Entities;

[Table("AlbumPhotos")]
public class AlbumPhoto
{
    public int AlbumId { get; set; }
    public Album Album { get; set; } = null!;
    public int PhotoId { get; set; }
    public Photo Photo { get; set; } = null!;
    public bool IsMain { get; set; }
}
