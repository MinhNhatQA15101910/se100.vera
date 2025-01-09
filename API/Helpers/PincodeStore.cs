using API.DTOs.Users;

namespace API.Helpers;

public class PincodeStore
{
    public Dictionary<string, string> PincodeMap { get; set; } = [];
    public Dictionary<string, RegisterDto> ValidateUserMap { get; set; } = [];
}
