using API.DTOs.Files;
using API.DTOs.Songs;
using API.DTOs.Users;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;

namespace API.Controllers;

public class UsersController(
    IUnitOfWork unitOfWork,
    UserManager<AppUser> userManager,
    IMapper mapper,
    IFileService fileService
) : BaseApiController
{
    [HttpPost("validate-token")]
    public async Task<ActionResult<bool>> ValidateToken()
    {
        var userId = User.GetUserId();

        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null) return false;

        return true;
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());

        if (user == null) return BadRequest("Could not find user");

        return mapper.Map<UserDto>(user);
    }

    [HttpPatch("change-password")]
    [Authorize]
    public async Task<ActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
    {
        var userId = User.GetUserId();

        var user = await userManager.FindByIdAsync(userId.ToString());
        if (user == null) return NotFound("Could not find user");

        var result = await userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);
        if (!result.Succeeded) return BadRequest(result.Errors);

        return NoContent();
    }

    [HttpPost("activate-artist")]
    [Authorize]
    public async Task<ActionResult> ActivateArtist(ActivateArtistDto activateArtistDto)
    {
        var userId = User.GetUserId();

        // Get user
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (user == null) return BadRequest("Could not find user");

        // Update user info
        user.ArtistName = activateArtistDto.ArtistName;
        user.About = activateArtistDto.About;
        user.UpdatedAt = DateTime.UtcNow;

        // Update user role
        var roleResult = await userManager.AddToRoleAsync(user, "Artist");
        if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        return NoContent();
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<FileDto>> AddPhoto(IFormFile file)
    {
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("Cannot update user");

        var result = await fileService.UploadImageAsync("/users/" + user.Id, file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        await unitOfWork.PhotoRepository.AddPhotoAsync(photo);

        var userPhoto = new UserPhoto
        {
            UserId = user.Id,
            PhotoId = photo.Id
        };
        if (user.Photos.Count == 0)
        {
            userPhoto.IsMain = true;
        }
        unitOfWork.UserPhotoRepository.AddUserPhoto(userPhoto);

        if (!await unitOfWork.Complete()) return BadRequest("Problem adding photo");

        return CreatedAtAction(
            nameof(GetCurrentUser),
            new { email = user.Email },
            mapper.Map<FileDto>(userPhoto)
        );
    }

    [HttpPut("set-main-photo/{photoId:int}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("Could not find user");

        var photo = await unitOfWork.PhotoRepository.GetPhotoByIdAsync(photoId);
        if (photo == null) return BadRequest("Could not find photo");

        var userPhoto = await unitOfWork.UserPhotoRepository.GetUserPhotoAsync(user.Id, photoId);
        if (userPhoto == null) return BadRequest("This photo does not belong to the user");
        if (userPhoto.IsMain) return BadRequest("This is already the main photo");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;

        userPhoto.IsMain = true;

        if (await unitOfWork.Complete()) return NoContent();

        return BadRequest("Problem setting main photo");
    }

    [HttpDelete("delete-photo/{photoId:int}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("User not found");

        var photo = await unitOfWork.PhotoRepository.GetPhotoByIdAsync(photoId);
        if (photo == null) return BadRequest("This photo cannot be deleted");

        var userPhoto = await unitOfWork.UserPhotoRepository.GetUserPhotoAsync(user.Id, photoId);
        if (userPhoto == null) return BadRequest("This photo does not belong to the user");

        if (userPhoto.IsMain) return BadRequest("This photo cannot be deleted");

        if (photo.PublicId != null)
        {
            var result = await fileService.DeleteFileAsync(photo.PublicId, ResourceType.Image);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        unitOfWork.PhotoRepository.RemovePhoto(photo);
        unitOfWork.UserPhotoRepository.RemoveUserPhoto(userPhoto);

        if (!await unitOfWork.Complete()) return BadRequest("Problem deleting photo");

        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers([FromQuery] UserParams userParams)
    {
        userParams.CurrentEmail = User.GetEmail();
        var users = await unitOfWork.UserRepository.GetUsersAsync(userParams);

        Response.AddPaginationHeader(users);

        return Ok(users);
    }

    [Authorize]
    [HttpGet("artists")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetArtists([FromQuery] UserParams userParams)
    {
        if (User.GetEmail() != null)
        {
            userParams.CurrentEmail = User.GetEmail();
        }

        var artists = await unitOfWork.UserRepository.GetArtistsAsync(userParams);

        Response.AddPaginationHeader(artists);

        return Ok(artists);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(id);

        if (user == null) return NotFound();

        return Ok(mapper.Map<UserDto>(user));
    }

    [HttpGet("me/favorite-songs")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetFavoriteSongs([FromQuery] SongParams songParams)
    {
        var userId = User.GetUserId();
        var songs = await unitOfWork.SongRepository.GetFavoriteSongsAsync(userId, songParams);

        Response.AddPaginationHeader(songs);

        return Ok(songs);
    }

    [HttpGet("me/favorite-albums")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<SongDto>>> GetFavoriteAlbums([FromQuery] AlbumParams albumParams)
    {
        var userId = User.GetUserId();
        var albums = await unitOfWork.AlbumRepository.GetFavoriteAlbumsAsync(userId, albumParams);

        Response.AddPaginationHeader(albums);

        return Ok(albums);
    }
}
