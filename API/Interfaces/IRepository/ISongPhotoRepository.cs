
using API.Entities;

namespace API.Interfaces;

public interface ISongPhotoRepository
{
   void AddSongPhoto(SongPhoto songPhoto);
   Task<List<SongPhoto>?> GetSongPhotoAsync(int songId);
   void RemoveSongPhoto(SongPhoto songPhoto);
   Task<bool> SaveChangesAsync();

}
