namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }
    public List<UserPhoto> Users { get; set; } = [];
    public List<SongPhoto> Songs { get; set; } = [];
    public List<AlbumPhoto> Albums { get; set; } = [];
    public List<PlaylistPhoto> Playlists { get; set; } = [];
}
