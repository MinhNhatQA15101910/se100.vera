namespace API.DTOs.Users;

public class SendPincodeEmailDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string? DisplayName { get; set; }

    [Required]
    [StringLength(6, MinimumLength = 6, ErrorMessage = "Pincode must be 6 digits")]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "Pincode must be 6 digits")]
    public string Pincode { get; set; } = string.Empty;
}
