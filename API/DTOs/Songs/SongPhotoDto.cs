namespace API.DTOs.Songs;

public class SongPhotoDto
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public bool IsMain { get; set; }
}
