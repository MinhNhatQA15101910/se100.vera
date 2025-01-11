namespace API.DTOs.Albums;

public class NewAlbumDto
{
    public int PublisherId { get; set; }
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public IFormFile? PhotoFile { get; set; }
    public List<int>? ArtistIds { get; set; }
    public List<int>? GenreIds { get; set; }
}
