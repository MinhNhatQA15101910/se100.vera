using API.Entities;

namespace API.Interfaces;

public interface ISongGenreRepository
{
   void AddSongGenre(SongGenre songGenre);
   Task<List<SongGenre>?> GetSongGenresAsync(int songId);
   void RemoveSongGenre(SongGenre songGenre);
   Task<bool> SaveChangesAsync();
}
