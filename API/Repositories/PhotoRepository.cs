using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class PhotoRepository(DataContext context) : IPhotoRepository
{
    public void AddPhoto(Photo photo)
    {
        context.Photos.Add(photo);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
