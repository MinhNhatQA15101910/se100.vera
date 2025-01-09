using API.Entities;

namespace API.Interfaces.IRepositories;

public interface IAlbumPhotoRepository
{
    void AddAlbumPhoto(AlbumPhoto albumPhoto);
}
