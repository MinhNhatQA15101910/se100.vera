using API.Entities;
using API.DTOs.Playlists;
using API.Helpers;
namespace API.Interfaces.IRepositories;

public interface IPlaylistRepository
{
    void CreatePlaylist(Playlist playlist);
    Task<Playlist> CreatePlaylistAsync(NewPlaylistDto newPlaylistDto);
    Task<Playlist?> GetPlaylistByIdAsync(int id);
    Task<Playlist?> GetPlaylistByNameAsync(int userId, string playlistName);
    Task<PagedList<PlaylistDto>> GetPlaylistsAsync(PlaylistParams playlistParams);
    Task<int> GetTotalPlaylistsAsync();
    void RemovePlaylist(Playlist playlist);
}
