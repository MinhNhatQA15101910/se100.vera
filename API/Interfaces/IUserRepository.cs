using API.DTOs.Users;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<IdentityResult> ChangePasswordAsync(AppUser user, ChangePasswordDto changePasswordDto);
    Task<bool> CheckPasswordAsync(AppUser user, string password);
    Task<IdentityResult> CreateUserAsync(RegisterDto registerDto);
    Task<AppUser?> GetUserByEmailAsync(string email);
    Task<AppUser?> GetUserByIdAsync(int id);
}
