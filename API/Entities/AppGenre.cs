namespace API.Entities;

public class AppGenre
{
    public int Id { get; set; }
    public required string GenreName { get; set; }
    public List<SongGenre> Songs { get; set; } = [];
}
