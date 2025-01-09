namespace API.DTOs.Users;

public class ResetPasswordDto
{
    [Required]
    [StringLength(50, MinimumLength = 8)]
    public required string NewPassword { get; set; }
}
