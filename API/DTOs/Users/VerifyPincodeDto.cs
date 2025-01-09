namespace API.DTOs.Users;

public class VerifyPincodeDto
{
    [Required, MinLength(6), MaxLength(6), RegularExpression(@"^\d{6}$")]
    public required string Pincode { get; set; }
}
