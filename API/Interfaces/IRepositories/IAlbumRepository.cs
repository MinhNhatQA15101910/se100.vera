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
    Task<PagedList<AlbumDto>> GetFavoriteAlbumsAsync(int userId, AlbumParams albumParams);
    int GetTotalAlbums();
    void RemoveFavoriteUser(AlbumFavorite existingFavoriteAlbum);
}
