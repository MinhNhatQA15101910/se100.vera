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

    public async Task<Photo?> GetPhotoByIdAsync(int photoId)
    {
        return await context.Photos.SingleOrDefaultAsync(p => p.Id == photoId);
    }

    public void RemovePhoto(Photo photo)
    {
        context.Photos.Remove(photo);
    }

    public async Task<Photo> AddPhotoAsync(Photo photo)
    {
        var newPhoto = await context.Photos.AddAsync(photo);
        return newPhoto.Entity;
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
