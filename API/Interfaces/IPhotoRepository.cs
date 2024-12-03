using API.Entities;

namespace API.Interfaces;

public interface IPhotoRepository
{
    void AddPhoto(Photo photo);
    Task<bool> SaveChangesAsync();
}
