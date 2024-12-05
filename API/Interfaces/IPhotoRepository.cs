using API.Entities;

namespace API.Interfaces;

public interface IPhotoRepository
{
    Task<Photo> AddPhotoAsync(Photo photo);
    Task<bool> SaveChangesAsync();
}
