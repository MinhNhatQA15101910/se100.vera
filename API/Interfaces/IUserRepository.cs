using API.DTOs.Users;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void ChangePasswordAsync(AppUser user, ChangePasswordDto changePasswordDto);
    Task<AppUser> CreateUserAsync(RegisterDto registerDto);
    Task<AppUser?> GetUserByEmailAsync(string email);
    Task<bool> SaveAllAsync();
    void Update(AppUser user);
}
