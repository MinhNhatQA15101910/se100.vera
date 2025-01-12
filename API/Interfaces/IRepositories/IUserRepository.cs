using API.DTOs.Users;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface IUserRepository
{
    Task<PagedList<UserDto>> GetArtistsAsync(UserParams userParams);
    Task<AppUser?> GetUserByIdAsync(int id);
    Task<PagedList<UserDto>> GetUsersAsync(UserParams userParams);
    Task<int> GetTotalUsersAsync();
    Task<int> GetTotalArtistsAsync();
}
