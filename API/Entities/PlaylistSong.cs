namespace API.Entities;

[Table("PlaylistSongs")]
public class PlaylistSong
{
    public int PlaylistId { get; set; }
    public AppPlaylist Playlist { get; set; } = null!;
    public int SongId { get; set; }
    public AppSong Song { get; set; } = null!;
    public int Order { get; set; }
}
