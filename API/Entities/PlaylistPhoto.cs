namespace API.Entities;


[Table("PlaylistPhotos")]
public class PlaylistPhoto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation properties
    public int PlaylistId { get; set; }
    public AppPlaylist Playlist { get; set; } = null!;
}
