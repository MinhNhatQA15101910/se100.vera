namespace API.Entities;


[Table("SongPhotos")]
public class SongPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }
    public bool IsMain { get; set; }

    // Navigation properties
    public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}
