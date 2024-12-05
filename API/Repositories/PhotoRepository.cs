using API.Data;
using API.Entities;
using API.Interfaces;
using API.Services;


namespace API.Repositories;

public class PhotoRepository(DataContext context) : IPhotoRepository
{
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
