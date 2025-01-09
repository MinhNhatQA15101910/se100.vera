using API.Entities;

namespace API.Interfaces.IRepositories;

public interface IPhotoRepository
{
    Task<Photo> AddPhotoAsync(Photo photo);
    Task<Photo?> GetPhotoByIdAsync(int photoId);
    void RemovePhoto(Photo photo);
}
