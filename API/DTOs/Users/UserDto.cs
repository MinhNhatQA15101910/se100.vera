namespace API.DTOs.Users;

public class UserDto
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? ArtistName { get; set; }
    public string? PhotoUrl { get; set; }
    public required string Gender { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string? About { get; set; }
    public required string State { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<string>? Roles { get; set; }
    public string? Token { get; set; }
}
