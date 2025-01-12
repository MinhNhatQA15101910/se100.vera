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

        user.UpdatedAt = DateTime.UtcNow;
        if (!await unitOfWork.Complete()) return BadRequest("Could not change password");

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

        // Update user role
        var roleResult = await userManager.AddToRoleAsync(user, "Artist");
        if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        user.UpdatedAt = DateTime.UtcNow;
        if (!await unitOfWork.Complete()) return BadRequest("Could not activate artist");

        return NoContent();
    }

    [HttpPut("update-photo")]
    public async Task<ActionResult<FileDto>> AddPhoto(IFormFile file)
    {
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(User.GetUserId());
        if (user == null) return BadRequest("Cannot update user");

        // Delete old photo
        foreach (var up in user.Photos)
        {
            if (up.PublicId != null)
            {
                var deleteResult = await fileService.DeleteFileAsync(up.PublicId, ResourceType.Image);
                if (deleteResult.Error != null) return BadRequest(deleteResult.Error.Message);
            }
        }
        user.Photos.Clear();

        // Upload new photo
        var result = await fileService.UploadImageAsync("/users/" + user.Id, file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var userPhoto = new UserPhoto
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
            IsMain = true
        };

        user.Photos.Add(userPhoto);

        user.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete()) return BadRequest("Problem adding photo");

        return CreatedAtAction(
            nameof(GetUser),
            new { id = user.Id },
            mapper.Map<FileDto>(userPhoto)
        );
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
