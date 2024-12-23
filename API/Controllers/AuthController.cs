using API.DTOs.Users;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Controllers;

public class AuthController(
    IEmailService emailService,
    ITokenService tokenService,
    UserManager<AppUser> userManager,
    IMapper mapper
) : BaseApiController
{
    [HttpPost("validate-signup")]
    public async Task<ActionResult<UserDto>> ValidateSignup(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Email))
        {
            return BadRequest("Email already exists.");
        }

        var result = await userManager.PasswordValidators.First().ValidateAsync(userManager, null!, registerDto.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(true);
    }

    [HttpPost("signup")]
    public async Task<ActionResult<UserDto>> Signup(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Email))
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
        var existingUser = await userManager.Users
            .Include(u => u.Photos).ThenInclude(p => p.Photo)
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .SingleOrDefaultAsync(x => x.NormalizedEmail == loginDto.Email.ToUpper());
        if (existingUser == null)
        {
            return Unauthorized("User with this email does not exist.");
        }

        var result = await userManager.CheckPasswordAsync(existingUser, loginDto.Password);
        if (!result) return Unauthorized("Invalid password");

        var userDto = mapper.Map<UserDto>(existingUser);
        userDto.Token = await tokenService.CreateTokenAsync(existingUser);

        return userDto;
    }

    [HttpPost("email-exists")]
    public async Task<ActionResult<object>> EmailExists(ValidateEmailDto validateEmailDto)
    {
        if (!await UserExists(validateEmailDto.Email))
        {
            return false;
        }

        return new
        {
            Token = await tokenService.CreateTokenAsync(new AppUser
            {
                Email = validateEmailDto.Email,
                FirstName = "",
                LastName = "",
                Gender = ""
            })
        };
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

    private async Task<bool> UserExists(string email)
    {
        return await userManager.Users.AnyAsync(x => x.NormalizedEmail == email.ToUpper());
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
