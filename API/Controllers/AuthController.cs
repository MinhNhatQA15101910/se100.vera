using API.DTOs.Users;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;

namespace API.Controllers;

public enum PincodeAction
{
    None,
    Signup,
    VerifyEmail
}

public class AuthController(
    PincodeStore pincodeStore,
    IEmailService emailService,
    ITokenService tokenService,
    UserManager<AppUser> userManager,
    IUnitOfWork unitOfWork,
    IMapper mapper
) : BaseApiController
{
    [HttpPost("validate-signup")]
    public async Task<ActionResult<UserDto>> ValidateSignup(RegisterDto registerDto)
    {
        // Check if email already exists
        if (await UserExists(registerDto.Email))
        {
            return BadRequest("Email already exists.");
        }

        // Check if password is valid
        var result = await userManager.PasswordValidators.First().ValidateAsync(
            userManager,
            null!,
            registerDto.Password
        );

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        registerDto.Role = "Listener";

        // Add to pincode map
        var pincode = GeneratePincode();
        pincodeStore.PincodeMap[registerDto.Email] = pincode;

        // Add to validate user map
        pincodeStore.ValidateUserMap[registerDto.Email] = registerDto;

        // Send pincode email
        var displayName = registerDto.FirstName;
        var email = registerDto.Email;
        var subject = "VERA ACCOUNT VERIFICATION CODE";
        var message = await System.IO.File.ReadAllTextAsync("./Assets/EmailContent.html");
        message = message.Replace("{{hideEmail}}", HideEmail(email));
        message = message.Replace("{{pincode}}", pincode);

        await emailService.SendEmailAsync(
            new EmailMessage(
                displayName,
                email,
                subject,
                message
            )
        );

        var token = tokenService.CreateVerifyPincodeTokenAsync(email, PincodeAction.Signup);
        return Ok(new { Token = token });
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

        // Add to pincode map
        var pincode = GeneratePincode();
        pincodeStore.PincodeMap[validateEmailDto.Email] = pincode;

        // Send pincode email
        var displayName = validateEmailDto.Email;
        var email = validateEmailDto.Email;
        var subject = "VERA ACCOUNT VERIFICATION CODE";
        var message = await System.IO.File.ReadAllTextAsync("./Assets/EmailContent.html");
        message = message.Replace("{{hideEmail}}", HideEmail(email));
        message = message.Replace("{{pincode}}", pincode);

        await emailService.SendEmailAsync(
            new EmailMessage(
                displayName,
                email,
                subject,
                message
            )
        );

        var token = tokenService.CreateVerifyPincodeTokenAsync(validateEmailDto.Email, PincodeAction.VerifyEmail);
        return Ok(new { Token = token });
    }

    [HttpPost("verify-pincode")]
    [Authorize]
    public async Task<ActionResult<object>> VerifyPincode(VerifyPincodeDto verifyPincodeDto)
    {
        // Get email
        var email = User.GetEmail();
        if (email == null)
        {
            return Unauthorized("Invalid email");
        }

        // Compare pincode
        var pincode = pincodeStore.PincodeMap[email];
        if (pincode != verifyPincodeDto.Pincode)
        {
            return BadRequest("Invalid pincode");
        }

        // Remove pincode
        pincodeStore.PincodeMap.Remove(email);

        // Get action
        var action = User.GetAction();
        if (action == PincodeAction.None)
        {
            return Unauthorized("Invalid action");
        }

        // Process action
        if (action == PincodeAction.Signup)
        {
            var registerDto = pincodeStore.ValidateUserMap[email];
            var user = mapper.Map<AppUser>(registerDto);

            var result = await userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            pincodeStore.ValidateUserMap.Remove(email);

            var roleResult = await userManager.AddToRoleAsync(user, registerDto.Role!);
            if (!roleResult.Succeeded)
            {
                return BadRequest(roleResult.Errors);
            }

            var userDto = mapper.Map<UserDto>(user);
            userDto.Token = await tokenService.CreateTokenAsync(user);

            return Ok(userDto);
        }
        else if (action == PincodeAction.VerifyEmail)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            var token = await tokenService.CreateTokenAsync(user);
            return Ok(new { Token = token });
        }

        return BadRequest("Invalid action");
    }

    [HttpPatch("reset-password")]
    [Authorize]
    public async Task<ActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
    {
        // Get userId
        var userId = User.GetUserId();

        // Get user
        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null)
        {
            return Unauthorized("User not found");
        }

        // Reset password
        user.PasswordHash = userManager.PasswordHasher.HashPassword(user, resetPasswordDto.NewPassword);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Could not reset password");
        }

        return NoContent();
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

    private static string GeneratePincode()
    {
        var random = new Random();
        return random.Next(100000, 999999).ToString();
    }
}
