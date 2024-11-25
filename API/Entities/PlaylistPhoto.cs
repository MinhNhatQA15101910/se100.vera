namespace API.Entities;


[Table("PlaylistPhotos")]
public class PlaylistPhoto
{
    public int PlaylistId { get; set; }
    public Playlist Playlist { get; set; } = null!;
    public int PhotoId { get; set; }
    public Photo Photo { get; set; } = null!;
    public bool IsMain { get; set; }
}
