using API.DTOs.Albums;
using API.Entities;
using API.Extensions;
using API.Interfaces;

namespace API.Controllers;

public class AlbumsController(
    IAlbumRepository albumRepository,
    IAlbumPhotoRepository albumPhotoRepository,
    IPhotoRepository photoRepository,
    IFileService fileService,
    IMapper mapper
) : BaseApiController
{
    [HttpPost]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult<AlbumDto>> CreateAlbum([FromForm] NewAlbumDto newAlbumDto)
    {
        if (newAlbumDto == null)
        {
            return BadRequest("Invalid album data.");
        }

        var userId = User.GetUserId();
        newAlbumDto.PublisherId = userId;

        // Add album to database
        var album = await albumRepository.CreateAlbumAsync(newAlbumDto);

        // Upload images and add to database
        bool isMain = true;
        if (newAlbumDto.PhotoFiles != null)
        {
            foreach (var photo in newAlbumDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/albums/" + album.Id, photo);

                if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

                var newPhoto = new Photo
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                };
                await photoRepository.AddPhotoAsync(newPhoto);

                var albumPhoto = new AlbumPhoto
                {
                    PhotoId = newPhoto.Id,
                    AlbumId = album.Id,
                    IsMain = isMain
                };
                albumPhotoRepository.AddAlbumPhoto(albumPhoto);

                isMain = false;
            }
        }

        if (!await albumRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to create album.");
        }

        return Ok(mapper.Map<AlbumDto>(album));

        // return CreatedAtAction(
        //     nameof(GetAlbumById),
        //     new { id = album.Id },
        //     mapper.Map<AlbumDto>(album)
        // );

    }
}
