using API.DTOs.Albums;
using API.Entities;
using API.Extensions;
using API.Interfaces;

namespace API.Controllers;

public class AlbumsController(
    IAlbumRepository albumRepository,
    IAlbumPhotoRepository albumPhotoRepository,
    IAlbumSongRepository albumSongRepository,
    ISongRepository songRepository,
    IPhotoRepository photoRepository,
    IFileService fileService,
    IMapper mapper
) : BaseApiController
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AlbumDto>> GetAlbumById(int id)
    {
        var album = await albumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound();
        }

        return mapper.Map<AlbumDto>(album);
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

        return CreatedAtAction(
            nameof(GetAlbumById),
            new { id = album.Id },
            mapper.Map<AlbumDto>(album)
        );
    }

    [HttpPut("add-song/{id:int}")]
    [Authorize(Roles = "Artist")]
    public async Task<ActionResult> AddSongToAlbum(int id, AddSongDto addSongDto)
    {
        var album = await albumRepository.GetAlbumByIdAsync(id);
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

        var song = await songRepository.GetSongByIdAsync(addSongDto.SongId);
        if (song == null)
        {
            return NotFound("Song not found.");
        }

        // Validate if the song belongs to the artist
        if (song.PublisherId != userId)
        {
            return Unauthorized("The song does not belong to you.");
        }

        albumSongRepository.AddAlbumSong(new AlbumSong
        {
            AlbumId = album.Id,
            SongId = song.Id
        });

        if (!await albumRepository.SaveChangesAsync())
        {
            return BadRequest("Failed to add song to album.");
        }

        return NoContent();
    }
}
