using API.Data;
using API.DTOs.Users;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class UserRepository(
    UserManager<AppUser> userManager,
    IMapper mapper
) : IUserRepository
{
    public void ChangePasswordAsync(AppUser user, ChangePasswordDto changePasswordDto)
    {

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
            .SingleOrDefaultAsync(x => x.NormalizedEmail == email.ToUpper());
    }
}
