
using API.Entities;

namespace API.Interfaces;

public interface ISongPhotoRepository
{
   void AddSongPhoto(SongPhoto songPhoto);
   Task<SongPhoto?> GetSongPhotoAsync(int songId, int photoId);
   void RemoveSongPhoto(SongPhoto songPhoto);
   Task<bool> SaveChangesAsync();

}
