using API.DTOs.Users;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController(IUserRepository userRepository) : BaseApiController
{
    // Testing
    [HttpPost("signup")] // /api/auth/signup
    public async Task<ActionResult<UserDto>> Signup(RegisterDto registerDto)
    {
        var existingUser = await userRepository.GetUserByEmailAsync(registerDto.Email);
        if (existingUser != null)
        {
            return BadRequest("Email already exists.");
        }

        var user = await userRepository.CreateUserAsync(registerDto);
        return user;
    }
}
