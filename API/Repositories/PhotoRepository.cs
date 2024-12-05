using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class PhotoRepository(DataContext context) : IPhotoRepository
{
    public async Task<Photo> AddPhotoAsync(Photo photo)
    {
        await context.Photos.AddAsync(photo);
        await context.SaveChangesAsync();

        return photo;
    }

    public async Task<Photo?> GetPhotoByIdAsync(int photoId)
    {
        return await context.Photos.SingleOrDefaultAsync(p => p.Id == photoId);
    }

    public void RemovePhoto(Photo photo)
    {
        context.Photos.Remove(photo);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
