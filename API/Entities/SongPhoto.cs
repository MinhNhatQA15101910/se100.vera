namespace API.Entities;


[Table("SongPhotos")]
public class SongPhoto
{
    public int SongId { get; set; }
    public Song Song { get; set; } = null!;
    public int PhotoId { get; set; }
    public Photo Photo { get; set; } = null!;
    public bool IsMain { get; set; }
}
