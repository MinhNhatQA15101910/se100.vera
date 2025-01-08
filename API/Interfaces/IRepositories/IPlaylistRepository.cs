using API.Entities;
using API.DTOs.Playlists;
using API.Helpers;
namespace API.Interfaces.IRepositories;

public interface IPlaylistRepository
{
   Task<Playlist> CreatePlaylistAsync(NewPlaylistDto newPlaylistDto);
   Task<Playlist?> GetPlaylistByIdAsync(int id);
   Task<PagedList<PlaylistDto>> GetPlaylistsAsync(PlaylistParams playlistParams);
}
