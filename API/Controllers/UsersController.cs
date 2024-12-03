using API.DTOs.Files;
using API.DTOs.Users;
using API.Entities;
using API.Extensions;
using API.Interfaces;

namespace API.Controllers;

[Authorize]
public class UsersController(
    IPhotoRepository photoRepository,
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
        userRepository.AddUserPhoto(userPhoto);

        if (!await userRepository.SaveChangesAsync()) return BadRequest("Problem adding photo");

        return CreatedAtAction(
            nameof(GetCurrentUser),
            new { email = user.Email },
            mapper.Map<FileDto>(userPhoto)
        );
    }

    // [HttpPut("set-main-photo/{photoId:int}")]
    // public async Task<ActionResult> SetMainPhoto(int photoId)
    // {
    //     var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

    //     if (user == null) return BadRequest("Could not find user");

    //     var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

    //     if (photo == null || photo.IsMain) return BadRequest("Cannot use this as main photo");

    //     var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
    //     if (currentMain != null) currentMain.IsMain = false;

    //     photo.IsMain = true;

    //     if (await userRepository.SaveAllAsync()) return NoContent();

    //     return BadRequest("Problem setting main photo");
    // }

    // [HttpDelete("delete-photo/{photoId:int}")]
    // public async Task<ActionResult> DeletePhoto(int photoId)
    // {
    //     var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

    //     if (user == null) return BadRequest("User not found");

    //     var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

    //     if (photo == null || photo.IsMain) return BadRequest("This photo cannot be deleted");

    //     if (photo.PublicId != null)
    //     {
    //         var result = await photoService.DeletePhotoAsync(photo.PublicId);
    //         if (result.Error != null) return BadRequest(result.Error.Message);
    //     }

    //     user.Photos.Remove(photo);

    //     if (await userRepository.SaveAllAsync()) return Ok();

    //     return BadRequest("Problem deleting photo");
    // }
}
