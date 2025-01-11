using API.DTOs.Songs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface ISongRepository
{
    void AddArtistSong(ArtistSong artistSong);
    void AddFavoriteUser(SongFavorite songFavorite);
    void AddSong(Song song);
    void AddSongGenre(SongGenre songGenre);
    Task<PagedList<SongDto>> GetFavoriteSongsAsync(int userId, SongParams songParams);
    Task<SongFavorite?> GetSongFavoriteAsync(int songId, int userId);
    Task<Song?> GetSongByIdAsync(int id);
    Task<PagedList<SongDto>> GetSongsAsync(SongParams songParams);
    Task<int> GetTotalSongsAsync();
    void RemoveFavoriteUser(SongFavorite songFavorite);
    void RemoveSong(Song song);
}
