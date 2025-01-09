using API.DTOs.Albums;
using API.Entities;
using API.Helpers;

namespace API.Interfaces.IRepositories;

public interface IAlbumRepository
{
    void AddFavoriteUser(AlbumFavorite favoriteAlbum);
    Task<Album> CreateAlbumAsync(NewAlbumDto newAlbumDto);
    void DeleteAlbum(Album album);
    Task<Album?> GetAlbumByIdAsync(int id);
    Task<AlbumFavorite?> GetAlbumFavoriteAsync(int albumId, int userId);
    Task<PagedList<AlbumDto>> GetAlbumsAsync(AlbumParams albumParams);
    Task<List<AlbumSong>> GetAlbumsSongsAsync(int albumId);
    Task<PagedList<AlbumDto>> GetFavoriteAlbumsAsync(int userId, AlbumParams albumParams);
    Task<int> GetMaxOrder(int albumId);
    void RemoveFavoriteUser(AlbumFavorite existingFavoriteAlbum);
    Task<int> GetTotalAlbumsAsync();
}
