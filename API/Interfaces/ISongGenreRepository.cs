using API.Entities;

namespace API.Interfaces;

public interface ISongGenreRepository
{
   void AddSongGenre(SongGenre songGenre);
   Task<List<SongGenre>?> GetSongGenreAsync(int songId);
   void RemoveSongGenre(SongGenre songGenre);
   Task<bool> SaveChangesAsync();
}
