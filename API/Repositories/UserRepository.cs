using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs.Users;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository(DataContext context, IMapper mapper) : IUserRepository
{
    public async Task<UserDto> CreateUserAsync(RegisterDto registerDto)
    {
        var registerUser = mapper.Map<AppUser>(registerDto);

        using var hmac = new HMACSHA512();

        registerUser.PasswordHashed = hmac.ComputeHash(
            Encoding.UTF8.GetBytes(registerDto.Password)
            );
        registerUser.PasswordSalt = hmac.Key;

        var user = await context.Users.AddAsync(registerUser);
        await context.SaveChangesAsync();

        return mapper.Map<UserDto>(user.Entity);
    }

    public async Task<AppUser?> GetUserByEmailAsync(string email)
    {
        return await context.Users.SingleOrDefaultAsync(x => x.Email == email);
    }
}
