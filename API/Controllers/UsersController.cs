using API.DTOs.Users;
using API.Extensions;
using API.Interfaces;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpPost("validate-token")]
    public async Task<ActionResult<bool>> ValidateToken()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        if (email == null) return false;

        var user = await userRepository.GetUserByEmailAsync(email);
        if (user == null) return false;

        return true;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await userRepository.GetUserByEmailAsync(User.GetEmail());

        if (user == null) return BadRequest("Could not find user");

        return mapper.Map<UserDto>(user);
    }

    [HttpPatch("change-password")]
    public async Task<ActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
    {
        var existingUser = await userRepository.GetUserByEmailAsync(User.GetEmail());
        if (existingUser == null)
        {
            return Unauthorized("User with this email does not exist.");
        }

        var checkPasswordResult = await userRepository.CheckPasswordAsync(
            existingUser, 
            changePasswordDto.CurrentPassword
        );
        if (!checkPasswordResult) return Unauthorized("Invalid current password");

        var changePasswordResult = userRepository.ChangePasswordAsync(
            existingUser, 
            changePasswordDto
        );

        if (changePasswordResult.Result.Errors.Any())
        {
            return BadRequest("Failed to change password.");
        }

        return NoContent();
    }
}
