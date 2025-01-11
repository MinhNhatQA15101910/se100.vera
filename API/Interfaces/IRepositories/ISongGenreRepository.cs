using API.Entities;

namespace API.Interfaces.IRepositories;

public interface ISongGenreRepository
{
   Task<List<SongGenre>?> GetSongGenresBySongIdAsync(int songId);
   Task<List<SongGenre>?> GetSongGenresByGenreIdAsync(int genreId);
   void RemoveSongGenre(SongGenre songGenre);
}
