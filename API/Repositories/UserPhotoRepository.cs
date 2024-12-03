using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class UserPhotoRepository(DataContext context) : IUserPhotoRepository
{
    public void AddUserPhoto(UserPhoto userPhoto)
    {
        context.UserPhotos.Add(userPhoto);
    }

    public async Task<UserPhoto?> GetUserPhotoAsync(int userId, int photoId)
    {
        return await context.UserPhotos
            .SingleOrDefaultAsync(
                up => up.UserId == userId &&
                up.PhotoId == photoId
            );
    }

    public void RemoveUserPhoto(UserPhoto userPhoto)
    {
        context.UserPhotos.Remove(userPhoto);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
