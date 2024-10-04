using API.DTOs.Users;
using API.Interfaces;

namespace API.Controllers;

public class AuthController(
    ITokenService tokenService,
    IUserRepository userRepository,
    IMapper mapper
    ) : BaseApiController
{
    [HttpPost("signup")]
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

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var existingUser = await userRepository.GetUserByEmailAsync(loginDto.Email);
        if (existingUser == null)
        {
            return Unauthorized("User with this email does not exist.");
        }

        using var hmac = new HMACSHA512(existingUser.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != existingUser.PasswordHashed[i])
            {
                return Unauthorized("Incorrect password.");
            }
        }

        var userDto = mapper.Map<UserDto>(existingUser);
        userDto.Token = tokenService.CreateToken(existingUser);

        return userDto;
    }
}
