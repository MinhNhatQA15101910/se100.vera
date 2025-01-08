using API.Data;
using API.Entities;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class AlbumPhotoRepository(DataContext context) : IAlbumPhotoRepository
{
    public void AddAlbumPhoto(AlbumPhoto albumPhoto)
    {
        context.AlbumPhotos.Add(albumPhoto);
    }
}
