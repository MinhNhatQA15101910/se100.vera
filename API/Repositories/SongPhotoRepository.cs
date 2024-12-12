

using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repositories;

public class SongPhotoRepository(DataContext context) : ISongPhotoRepository
{
   public void AddSongPhoto(SongPhoto songPhoto)
   {
      context.SongPhotos.Add(songPhoto);
   }

   public async Task<SongPhoto?> GetSongPhotoAsync(int songId, int photoId)
   {
      return await context.SongPhotos
            .SingleOrDefaultAsync(
                up => up.SongId == songId &&
                up.PhotoId == photoId
            );
   }

   public void RemoveSongPhoto(SongPhoto songPhoto)
   {
      context.SongPhotos.Remove(songPhoto);
   }

   public async Task<bool> SaveChangesAsync()
   {
      return await context.SaveChangesAsync() > 0;
   }
}
