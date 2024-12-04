using API.DTOs.Users;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class UserRepository(
    UserManager<AppUser> userManager,
    IMapper mapper
) : IUserRepository
{
    public async Task<IdentityResult> ChangePasswordAsync(
        AppUser user,
        ChangePasswordDto changePasswordDto
    )
    {
        var result = await userManager.ChangePasswordAsync(
            user,
            changePasswordDto.CurrentPassword,
            changePasswordDto.NewPassword
        );

        return result;
    }

    public Task<bool> CheckPasswordAsync(AppUser user, string password)
    {
        return userManager.CheckPasswordAsync(user, password);
    }

    public async Task<IdentityResult> CreateUserAsync(RegisterDto registerDto)
    {
        var password = registerDto.Password;
        var registerUser = mapper.Map<AppUser>(registerDto);

        var result = await userManager.CreateAsync(registerUser, password);

        return result;
    }

    public async Task<AppUser?> GetUserByEmailAsync(string email)
    {
        return await userManager.Users
            .Include(u => u.Photos).ThenInclude(p => p.Photo)
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .SingleOrDefaultAsync(x => x.NormalizedEmail == email.ToUpper());
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await userManager.Users
            .Include(u => u.Photos).ThenInclude(p => p.Photo)
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .SingleOrDefaultAsync(u => u.Id == id);
    }
}
