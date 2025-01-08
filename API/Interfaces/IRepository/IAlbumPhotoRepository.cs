using API.Entities;

namespace API.Interfaces;

public interface IAlbumPhotoRepository
{
    void AddAlbumPhoto(AlbumPhoto albumPhoto);
    Task<bool> SaveChangesAsync();
}
