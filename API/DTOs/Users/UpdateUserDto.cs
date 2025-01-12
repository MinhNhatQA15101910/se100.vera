namespace API.DTOs.Users;

public class UpdateUserDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? ArtistName { get; set; }
    public string? Gender { get; set; }
    public string? About { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public IFormFile? PhotoFile { get; set; }
}
