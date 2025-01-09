namespace API.DTOs.Albums;

public class AddRemoveSongDto
{
    [Required]
    public int SongId { get; set; }

    public int? Order { get; set; }
}
