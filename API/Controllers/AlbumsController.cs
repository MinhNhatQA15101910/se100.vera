using API.DTOs.Albums;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;

namespace API.Controllers;

public class AlbumsController(
    IUnitOfWork unitOfWork,
    IFileService fileService,
    IMapper mapper
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AlbumDto>> GetAlbumById(int id)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound();
        }

        return mapper.Map<AlbumDto>(album);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums([FromQuery] AlbumParams albumParams)
    {
        var albums = await unitOfWork.AlbumRepository.GetAlbumsAsync(albumParams);

        Response.AddPaginationHeader(albums);

        return Ok(albums);
    }

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
        var album = await unitOfWork.AlbumRepository.CreateAlbumAsync(newAlbumDto);

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
                await unitOfWork.PhotoRepository.AddPhotoAsync(newPhoto);

                var albumPhoto = new AlbumPhoto
                {
                    PhotoId = newPhoto.Id,
                    AlbumId = album.Id,
                    IsMain = isMain
                };
                unitOfWork.AlbumPhotoRepository.AddAlbumPhoto(albumPhoto);

                isMain = false;
            }
        }

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to create album.");
        }

        return CreatedAtAction(
            nameof(GetAlbumById),
            new { id = album.Id },
            mapper.Map<AlbumDto>(album)
        );
    }

    [HttpPut("add-song/{id:int}")]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult> AddSongToAlbum(int id, AddRemoveSongDto addSongDto)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate if the album belongs to the artist
        var userId = User.GetUserId();
        if (album.PublisherId != userId)
        {
            return Unauthorized("The album does not belong to you.");
        }

        var song = await unitOfWork.SongRepository.GetSongByIdAsync(addSongDto.SongId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        // Validate if the song belongs to the artist
        if (song.PublisherId != userId)
        {
            return Unauthorized("The song does not belong to you.");
        }

        // Add album song to database
        unitOfWork.AlbumSongRepository.AddAlbumSong(new AlbumSong
        {
            AlbumId = album.Id,
            SongId = song.Id
        });

        // Update album's total songs and update date
        album.TotalSongs++;
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to add song to album.");
        }

        return NoContent();
    }

    [HttpPut("remove-song/{id:int}")]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult> RemoveSongFromAlbum(int id, AddRemoveSongDto removeSongDto)
    {
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate if the album belongs to the artist
        var userId = User.GetUserId();
        if (album.PublisherId != userId)
        {
            return Unauthorized("The album does not belong to you.");
        }

        var song = await unitOfWork.SongRepository.GetSongByIdAsync(removeSongDto.SongId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        // Validate if the song belongs to the artist
        if (song.PublisherId != userId)
        {
            return Unauthorized("The song does not belong to you.");
        }

        // Validate if the song is in the album
        var albumSong = await unitOfWork.AlbumSongRepository.GetAlbumSongAsync(album.Id, song.Id);
        if (albumSong == null)
        {
            return NotFound("Song not found in album.");
        }

        // Remove song from album
        unitOfWork.AlbumSongRepository.RemoveAlbumSong(albumSong);

        // Update album's total songs and update date
        album.TotalSongs--;
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to remove song from album.");
        }

        return NoContent();
    }
}
