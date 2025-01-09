using API.Entities;

namespace API.Interfaces.IRepositories;

public interface IArtistSongRepository
{
   void AddArtistSong(ArtistSong artistSong);
   Task<List<ArtistSong>?> GetArtistSongsAsync(int songId);
   void RemoveArtistSong(ArtistSong artistSong);
}
