using API.Entities;

namespace API.Interfaces;

public interface IUserPhotoRepository
{
    void AddUserPhoto(UserPhoto userPhoto);
    Task<UserPhoto?> GetUserPhotoAsync(int userId, int photoId);
    void RemoveUserPhoto(UserPhoto userPhoto);
    Task<bool> SaveChangesAsync();
}
