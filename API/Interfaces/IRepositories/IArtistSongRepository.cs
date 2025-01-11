using API.Entities;

namespace API.Interfaces.IRepositories;

public interface IArtistSongRepository
{
   Task<List<ArtistSong>?> GetArtistSongsAsync(int songId);
   void RemoveArtistSong(ArtistSong artistSong);
}
