namespace API.Entities;

[Table("AlbumPhotos")]
public class AlbumPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }
    public bool IsMain { get; set; }

    // Navigation properties
    public int AlbumId { get; set; }
    public Album Album { get; set; } = null!;
}
