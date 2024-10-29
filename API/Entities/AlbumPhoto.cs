namespace API.Entities;

[Table("AlbumPhotos")]
public class AlbumPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation properties
    public int AlbumId { get; set; }
    public AppAlbum Album { get; set; } = null!;
}
