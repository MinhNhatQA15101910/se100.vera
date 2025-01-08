using API.Entities;

namespace API.Interfaces.IRepositories;

public interface ISongGenreRepository
{
   void AddSongGenre(SongGenre songGenre);
   Task<List<SongGenre>?> GetSongGenresAsync(int songId);
   void RemoveSongGenre(SongGenre songGenre);
}
