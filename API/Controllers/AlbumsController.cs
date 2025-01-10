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

                var albumPhoto = new AlbumPhoto
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                    IsMain = isMain
                };

                album.Photos.Add(albumPhoto);

                isMain = false;
            }
        }

        // Add current user to artistIds
        if (newAlbumDto.ArtistIds != null)
        {
            if (!newAlbumDto.ArtistIds.Contains(userId))
            {
                newAlbumDto.ArtistIds.Add(userId);
            }
        }
        else
        {
            newAlbumDto.ArtistIds = [userId];
        }

        // Check if any artistId is not valid
        foreach (var artistId in newAlbumDto.ArtistIds)
        {
            var artist = await unitOfWork.UserRepository.GetUserByIdAsync(artistId);
            if (artist == null || !artist.UserRoles.Any(ur => ur.Role.Name == "Artist"))
            {
                return BadRequest("Artist not found.");
            }
        }

        // Add album artists to database
        foreach (var artistId in newAlbumDto.ArtistIds)
        {
            unitOfWork.UserRepository.AddArtistAlbum(new ArtistAlbum
            {
                AlbumId = album.Id,
                ArtistId = artistId
            });
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

    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin, Artist")]
    public async Task<ActionResult> UpdateAlbum(int id, UpdateAlbumDto updateAlbumDto)
    {
        var userId = User.GetUserId();

        // Check album exist
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate user role
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (!user!.UserRoles.Any(ur => ur.Role.Name == "Admin") && album.PublisherId != userId)
        {
            return Unauthorized("Unauthorized to update album.");
        }

        mapper.Map(updateAlbumDto, album);

        if (updateAlbumDto.PhotoFiles != null)
        {
            // Delete old image
            var oldPhotos = album.Photos;
            foreach (var oldPhoto in oldPhotos)
            {
                if (oldPhoto.PublicId != null)
                {
                    var result = await fileService.DeleteFileAsync(oldPhoto.PublicId!, ResourceType.Image);
                    if (result.Error != null) return BadRequest("Delete album file from cloudinary failed: " + result.Error.Message);
                }
                album.Photos.Remove(oldPhoto);
            }

            // Upload new images and add to database
            bool isMain = true;
            foreach (var photo in updateAlbumDto.PhotoFiles)
            {
                var uploadResult = await fileService.UploadImageAsync("/albums/" + album.Id, photo);
                if (uploadResult.Error != null) return BadRequest("Upload photo files to cloudinary failed: " + uploadResult.Error.Message);

                var albumPhoto = new AlbumPhoto
                {
                    Url = uploadResult.SecureUrl.ToString(),
                    PublicId = uploadResult.PublicId,
                    IsMain = isMain
                };
                album.Photos.Add(albumPhoto);

                isMain = false;
            }
        }

        // Update artists
        if (updateAlbumDto.ArtistIds != null)
        {
            if (!updateAlbumDto.ArtistIds.Contains(userId))
            {
                updateAlbumDto.ArtistIds.Add(userId);
            }

            // Check if any artistId is not valid
            foreach (var artistId in updateAlbumDto.ArtistIds)
            {
                var artist = await unitOfWork.UserRepository.GetUserByIdAsync(artistId);
                if (artist == null || !artist.UserRoles.Any(ur => ur.Role.Name == "Artist"))
                {
                    return BadRequest("Artist not found.");
                }
            }

            // Remove old artists
            var oldArtists = album.Artists;
            foreach (var oldArtist in oldArtists)
            {
                unitOfWork.UserRepository.RemoveArtistAlbum(oldArtist);
            }

            // Add new artists
            foreach (var artistId in updateAlbumDto.ArtistIds)
            {
                unitOfWork.UserRepository.AddArtistAlbum(new ArtistAlbum
                {
                    AlbumId = album.Id,
                    ArtistId = artistId
                });
            }
        }

        // Update album's updated date
        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to update album.");
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin, Artist")]
    public async Task<ActionResult> DeleteAlbum(int id)
    {
        var userId = User.GetUserId();

        // Check album exist
        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(id);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        // Validate user role
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
        if (!user!.UserRoles.Any(ur => ur.Role.Name == "Admin") && album.PublisherId != userId)
        {
            return Unauthorized("Unauthorized to delete album.");
        }

        // Delete album photos
        var photos = album.Photos;
        foreach (var photo in photos)
        {
            if (photo.PublicId != null)
            {
                var result = await fileService.DeleteFileAsync(photo.PublicId!, ResourceType.Image);
                if (result.Error != null) return BadRequest("Delete album file from cloudinary failed: " + result.Error.Message);
            }
            album.Photos.Remove(photo);
        }

        unitOfWork.AlbumRepository.DeleteAlbum(album);

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to delete album.");
        }

        return NoContent();
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

        // Check if the song is already in the album
        var albumSong = await unitOfWork.AlbumSongRepository.GetAlbumSongAsync(album.Id, song.Id);
        if (albumSong != null)
        {
            return BadRequest("Song already in album.");
        }

        // Add album song to database
        if (addSongDto.Order != null)
        {
            if (addSongDto.Order < 1)
            {
                return BadRequest("Invalid order.");
            }

            var maxOrder = await unitOfWork.AlbumRepository.GetMaxOrder(album.Id);
            if (addSongDto.Order <= maxOrder)
            {
                var albumSongs = await unitOfWork.AlbumRepository.GetAlbumsSongsAsync(album.Id);
                foreach (var albSong in albumSongs)
                {
                    if (albSong.Order >= addSongDto.Order)
                    {
                        albSong.Order++;
                    }
                }
            }

            unitOfWork.AlbumSongRepository.AddAlbumSong(new AlbumSong
            {
                AlbumId = album.Id,
                SongId = song.Id,
                Order = addSongDto.Order.Value
            });
        }
        else
        {
            var maxOrder = await unitOfWork.AlbumRepository.GetMaxOrder(album.Id);

            unitOfWork.AlbumSongRepository.AddAlbumSong(new AlbumSong
            {
                AlbumId = album.Id,
                SongId = song.Id,
                Order = maxOrder + 1
            });
        }

        // Update album's total songs and update date
        album.TotalSongs++;

        // Update album's total duration
        if (string.IsNullOrEmpty(album.TotalDuration))
        {
            album.TotalDuration = song.Duration;
        }
        else
        {
            _ = TimeSpan.TryParse(album.TotalDuration, out TimeSpan albumTotalDuration);
            _ = TimeSpan.TryParse(song.Duration, out TimeSpan songDuration);
            albumTotalDuration += songDuration;
            album.TotalDuration = albumTotalDuration.ToString(@"hh\:mm\:ss");
        }

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

        // Update songAlbums order.
        var albumSongs = await unitOfWork.AlbumRepository.GetAlbumsSongsAsync(album.Id);
        foreach (var albSong in albumSongs)
        {
            if (albSong.Order > albumSong.Order)
            {
                albSong.Order--;
            }
        }

        // Update album's total songs and update date
        album.TotalSongs--;

        // Update album's total duration
        _ = TimeSpan.TryParse(album.TotalDuration, out TimeSpan albumTotalDuration);
        _ = TimeSpan.TryParse(song.Duration, out TimeSpan songDuration);
        albumTotalDuration -= songDuration;
        album.TotalDuration = albumTotalDuration.TotalSeconds == 0 ? "" : albumTotalDuration.ToString(@"hh\:mm\:ss");

        album.UpdatedAt = DateTime.UtcNow;

        if (!await unitOfWork.Complete())
        {
            return BadRequest("Failed to remove song from album.");
        }

        return NoContent();
    }

    [HttpPost("toggle-favorite/{albumId:int}")]
    [Authorize]
    public async Task<ActionResult> ToggleFavorite(int albumId)
    {
        int userId = User.GetUserId();

        var album = await unitOfWork.AlbumRepository.GetAlbumByIdAsync(albumId);
        if (album == null)
        {
            return NotFound("Album not found.");
        }

        var existingFavoriteAlbum = await unitOfWork.AlbumRepository.GetAlbumFavoriteAsync(albumId, userId);
        if (existingFavoriteAlbum == null)
        {
            var favoriteAlbum = new AlbumFavorite
            {
                AlbumId = albumId,
                UserId = userId
            };

            unitOfWork.AlbumRepository.AddFavoriteUser(favoriteAlbum);
        }
        else
        {
            unitOfWork.AlbumRepository.RemoveFavoriteUser(existingFavoriteAlbum);
        }

        if (await unitOfWork.Complete()) return Ok();

        return BadRequest("Failed to add song to favorite.");
    }

    [HttpGet("is-favorite/{albumId:int}")]
    [Authorize]
    public async Task<ActionResult<bool>> IsUserFavorite(int albumId)
    {
        int userId = User.GetUserId();

        var favoriteAlbum = await unitOfWork.AlbumRepository.GetAlbumFavoriteAsync(albumId, userId);

        return favoriteAlbum != null;
    }
}
