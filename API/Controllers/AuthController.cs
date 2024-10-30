using API.DTOs.Users;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Controllers;

public class AuthController(
    IEmailService emailService,
    ITokenService tokenService,
    IUserRepository userRepository,
    UserManager<AppUser> userManager,
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

        var user = mapper.Map<AppUser>(registerDto);

        var result = await userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        else
        {
            await userManager.AddToRoleAsync(user, registerDto.Role ?? "Listener");
        }

        return mapper.Map<UserDto>(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var existingUser = await userRepository.GetUserByEmailAsync(loginDto.Email);
        if (existingUser == null)
        {
            return Unauthorized("User with this email does not exist.");
        }

        var userDto = mapper.Map<UserDto>(existingUser);
        userDto.Token = await tokenService.CreateTokenAsync(existingUser);

        return userDto;
    }

    [HttpPost("email-exists")]
    public async Task<ActionResult<bool>> EmailExists(ValidateEmailDto validateEmailDto)
    {
        var existingUser = await userRepository.GetUserByEmailAsync(validateEmailDto.Email);
        return existingUser != null;
    }

    [HttpPost("send-email")]
    public async Task<ActionResult> SendEmail(SendPincodeEmailDto sendPincodeEmailDto)
    {
        var displayName = sendPincodeEmailDto.DisplayName;
        var email = sendPincodeEmailDto.Email;
        var pincode = sendPincodeEmailDto.Pincode;
        var subject = "VERA ACCOUNT VERIFICATION CODE";

        var message = await System.IO.File.ReadAllTextAsync("./Assets/EmailContent.html");

        message = message.Replace("{{hideEmail}}", HideEmail(email));
        message = message.Replace("{{pincode}}", pincode);

        await emailService.SendEmailAsync(
            new EmailMessage(displayName, email, subject, message));

        return Ok();
    }

    [HttpPatch("change-password/{email:regex(^\\S+@\\S+\\.\\S+$)}")]
    public async Task<ActionResult> ChangePassword(string email, ChangePasswordDto changePasswordDto)
    {
        var existingUser = await userRepository.GetUserByEmailAsync(email);
        if (existingUser == null)
        {
            return Unauthorized("User with this email does not exist.");
        }

        userRepository.ChangePasswordAsync(existingUser, changePasswordDto);

        if (!await userRepository.SaveAllAsync())
        {
            return BadRequest("Failed to change password.");
        }

        return NoContent();
    }

    private static string HideEmail(string email)
    {
        var emailParts = email.Split('@');
        var emailName = emailParts[0];
        var emailDomain = emailParts[1];

        var emailNameLength = emailName.Length;
        var emailNameFirstChar = emailName[0];
        var emailNameLastChar = emailName[emailNameLength - 1];

        var hiddenEmailName = emailNameFirstChar + new string('*', emailNameLength - 2) + emailNameLastChar;

        return $"{hiddenEmailName}@{emailDomain}";
    }
}
