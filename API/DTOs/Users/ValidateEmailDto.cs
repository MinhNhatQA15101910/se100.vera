namespace API.DTOs.Users;

public class ValidateEmailDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
