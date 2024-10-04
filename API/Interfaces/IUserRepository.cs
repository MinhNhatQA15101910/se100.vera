using API.DTOs.Users;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    Task<UserDto> CreateUserAsync(RegisterDto registerDto);
    Task<AppUser?> GetUserByEmailAsync(string email);
}
