namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public byte[] PasswordHashed { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
}
