using API.Entities;

namespace API.Interfaces;

public interface IPhotoRepository
{
    void AddPhoto(Photo photo);
    Task<Photo?> GetPhotoByIdAsync(int photoId);
    void RemovePhoto(Photo photo);
    Task<bool> SaveChangesAsync();
}
