using API.Data;
using API.DTOs.Users;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public void ChangePasswordAsync(AppUser user, ChangePasswordDto changePasswordDto)
    {
        using var hmac = new HMACSHA512();

        user.PasswordHashed = hmac.ComputeHash(
            Encoding.UTF8.GetBytes(changePasswordDto.NewPassword)
            );
        user.PasswordSalt = hmac.Key;
    }

    public async Task<AppUser> CreateUserAsync(RegisterDto registerDto)
    {
        var registerUser = mapper.Map<AppUser>(registerDto);

        using var hmac = new HMACSHA512();

        registerUser.PasswordHashed = hmac.ComputeHash(
            Encoding.UTF8.GetBytes(registerDto.Password)
            );
        registerUser.PasswordSalt = hmac.Key;

        var user = await context.Users.AddAsync(registerUser);

        return user.Entity;
    }

    public async Task<AppUser?> GetUserByEmailAsync(string email)
    {
        return await context.Users.SingleOrDefaultAsync(x => x.Email == email);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
