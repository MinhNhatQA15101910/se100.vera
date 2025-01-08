
using API.Entities;

namespace API.Interfaces.IRepositories;

public interface ISongPhotoRepository
{
   void AddSongPhoto(SongPhoto songPhoto);
   Task<List<SongPhoto>?> GetSongPhotoAsync(int songId);
   void RemoveSongPhoto(SongPhoto songPhoto);

}
