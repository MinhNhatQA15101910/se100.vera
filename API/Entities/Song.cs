namespace API.Entities;

public class Song
{
    public int Id { get; set; }
    public required string SongName { get; set; }
    public required string Description { get; set; }
    public int TotalListeningHours { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public required string MusicUrl { get; set; } = "";
    public string? MusicPublicId { get; set; }
    public required string Duration { get; set; } = "";
    public string? LyricUrl { get; set; }
    public string? LyricPublicId { get; set; }
    public List<SongPhoto> Photos { get; set; } = [];
    public List<ArtistSong> Artists { get; set; } = [];
    public List<AlbumSong> Albums { get; set; } = [];
    public List<PlaylistSong> Playlists { get; set; } = [];
    public List<SongGenre> Genres { get; set; } = [];

    // Navigation properties
    public int PublisherId { get; set; }
    public AppUser Publisher { get; set; } = null!;
}
