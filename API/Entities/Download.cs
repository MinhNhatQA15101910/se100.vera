namespace API.Entities;

public class Download
{
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int SongId { get; set; }
    public Song Song { get; set; } = null!;
    public int Count { get; set; }
}
