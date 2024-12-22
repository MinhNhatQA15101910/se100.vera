namespace API.DTOs.Albums;

public class NewAlbumDto
{
    public int PublisherId { get; set; }
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public List<IFormFile>? PhotoFiles { get; set; }
}
