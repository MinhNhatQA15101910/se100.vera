namespace API.DTOs.Users;

public class VerifyPincodeDto
{
    public required string Email { get; set; }
    public required string Pincode { get; set; }
    public string? Action { get; set; } = "signup";
}
