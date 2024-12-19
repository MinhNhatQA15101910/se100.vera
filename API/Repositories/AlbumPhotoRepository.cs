using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class AlbumPhotoRepository(DataContext context) : IAlbumPhotoRepository
{
    public void AddAlbumPhoto(AlbumPhoto albumPhoto)
    {
        context.AlbumPhotos.Add(albumPhoto);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
