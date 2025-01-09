namespace API.DTOs.Users;

public class ActivateArtistDto
{
    [Required]
    [MinLength(1), MaxLength(50)]
    public required string ArtistName { get; set; }

    public string? About { get; set; }
}
