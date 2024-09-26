namespace API.Entities;

public enum Role
{
    Admin,
    Artist,
    User
}

public class AppUser
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public byte[] PasswordHashed { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? ArtistName { get; set; }
    public required string Gender { get; set; }
    public DateOnly DateOfBirth { get; set; } = new DateOnly(2003, 1, 1);
    public string? About { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public List<Photo> Photos { get; set; } = [];
}
