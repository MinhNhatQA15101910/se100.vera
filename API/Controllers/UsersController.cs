using API.DTOs.Files;
using API.DTOs.Users;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;

namespace API.Controllers;

[Authorize]
public class UsersController(
    IPhotoRepository photoRepository,
    IUserPhotoRepository userPhotoRepository,
    IUserRepository userRepository,
    IMapper mapper,
    IFileService fileService
) : BaseApiController
{
    [HttpPost("validate-token")]
    public async Task<ActionResult<bool>> ValidateToken()
    {
        var userId = User.GetUserId();

        var user = await userRepository.GetUserByIdAsync(userId);
        if (user == null) return false;

        return true;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await userRepository.GetUserByIdAsync(User.GetUserId());

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

    [HttpPost("add-photo")]
    public async Task<ActionResult<FileDto>> AddPhoto(IFormFile file)
    {
        var user = await userRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("Cannot update user");

        var result = await fileService.UploadImageAsync("/users/" + user.Id, file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        photoRepository.AddPhoto(photo);

        if (!await photoRepository.SaveChangesAsync()) return BadRequest("Problem adding photo");

        var userPhoto = new UserPhoto
        {
            UserId = user.Id,
            PhotoId = photo.Id
        };
        if (user.Photos.Count == 0)
        {
            userPhoto.IsMain = true;
        }
        userPhotoRepository.AddUserPhoto(userPhoto);

        if (!await userPhotoRepository.SaveChangesAsync()) return BadRequest("Problem adding photo");

        return CreatedAtAction(
            nameof(GetCurrentUser),
            new { email = user.Email },
            mapper.Map<FileDto>(userPhoto)
        );
    }

    [HttpPut("set-main-photo/{photoId:int}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await userRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("Could not find user");

        var photo = await photoRepository.GetPhotoByIdAsync(photoId);
        if (photo == null) return BadRequest("Could not find photo");

        var userPhoto = await userPhotoRepository.GetUserPhotoAsync(user.Id, photoId);
        if (userPhoto == null) return BadRequest("This photo does not belong to the user");
        if (userPhoto.IsMain) return BadRequest("This is already the main photo");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;

        userPhoto.IsMain = true;

        if (await userPhotoRepository.SaveChangesAsync()) return NoContent();

        return BadRequest("Problem setting main photo");
    }

    [HttpDelete("delete-photo/{photoId:int}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        var user = await userRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("User not found");

        var photo = await photoRepository.GetPhotoByIdAsync(photoId);
        if (photo == null) return BadRequest("This photo cannot be deleted");

        var userPhoto = await userPhotoRepository.GetUserPhotoAsync(user.Id, photoId);
        if (userPhoto == null) return BadRequest("This photo does not belong to the user");

        if (userPhoto.IsMain) return BadRequest("This photo cannot be deleted");

        if (photo.PublicId != null)
        {
            var result = await fileService.DeleteFileAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        photoRepository.RemovePhoto(photo);
        userPhotoRepository.RemoveUserPhoto(userPhoto);

        if (!await photoRepository.SaveChangesAsync()) return BadRequest("Problem deleting photo");

        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] UserParams userParams)
    {
        userParams.CurrentEmail = User.GetEmail();
        var users = await userRepository.GetUsersAsync(userParams);

        Response.AddPaginationHeader(users);

        return Ok(users);
    }
}
