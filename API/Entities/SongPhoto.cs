namespace API.Entities;


[Table("SongPhotos")]
public class SongPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation properties
    public int SongId { get; set; }
    public AppSong Song { get; set; } = null!;
}
