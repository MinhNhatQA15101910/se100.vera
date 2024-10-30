namespace API.Entities;

[Table("AlbumSongs")]
public class AlbumSong
{
    public int AlbumId { get; set; }
    public AppAlbum Album { get; set; } = null!;
    public int SongId { get; set; }
    public AppSong Song { get; set; } = null!;
    public int Order { get; set; }
}
