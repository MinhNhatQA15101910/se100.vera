namespace API.Entities;

[Table("ArtistSongs")]
public class ArtistSong
{
    public int ArtistId { get; set; }
    public AppUser Artist { get; set; } = null!;
    public int SongId { get; set; }
    public AppSong Song { get; set; } = null!;
}
