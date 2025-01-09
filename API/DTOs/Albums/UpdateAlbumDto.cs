namespace API.DTOs.Albums;

public class UpdateAlbumDto
{
    public required string AlbumName { get; set; }
    public required string Description { get; set; }
    public List<IFormFile>? PhotoFiles { get; set; }
    public List<int>? ArtistIds { get; set; }
}
