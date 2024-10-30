namespace API.Entities;

[Table("SongGenres")]
public class SongGenre
{
    public int SongId { get; set; }
    public AppSong Song { get; set; } = null!;
    public int GenreId { get; set; }
    public AppGenre Genre { get; set; } = null!;
}
