using API.Data;
using API.DTOs.Playlists;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class PlaylistRepository(DataContext context, IMapper mapper) : IPlaylistRepository
{
   public async Task<Playlist> CreatePlaylistAsync(NewPlaylistDto newPlaylistDto)
   {
      var playlist = mapper.Map<Playlist>(newPlaylistDto);

      await context.Playlists.AddAsync(playlist);
      await context.SaveChangesAsync();

      return playlist;
   }

   public Task<Playlist?> GetPlaylistByIdAsync(int id)
   {
      return context.Playlists
         .Include(p => p.Publisher)
         .Include(p => p.Songs).ThenInclude(ps => ps.Song).ThenInclude(s => s.Photos).ThenInclude(sp => sp.Photo)
         .FirstOrDefaultAsync(p => p.Id == id);
   }

   public async Task<PagedList<PlaylistDto>> GetPlaylistsAsync(PlaylistParams playlistParams)
   {
      var query = context.Playlists.AsQueryable();

      if (playlistParams.PlaylistName != null)
      {
         query = query.Where(p => p.PlaylistName.Contains(playlistParams.PlaylistName));
      }

      if (playlistParams.PublisherId != null)
      {
         query = query.Where(p => p.PublisherId.ToString() == playlistParams.PublisherId);
      }

      query = playlistParams.OrderBy switch
      {
         "playlistName" => playlistParams.SortBy == "asc" ? query.OrderBy(p => p.PlaylistName) : query.OrderByDescending(p => p.PlaylistName),
         _ => query.OrderBy(p => p.PlaylistName)
      };

      return await PagedList<PlaylistDto>.CreateAsync(
           query.ProjectTo<PlaylistDto>(mapper.ConfigurationProvider),
           playlistParams.PageNumber,
           playlistParams.PageSize
      );
   }

   public async Task<int> GetTotalPlaylistsAsync()
   {
      return await context.Playlists.CountAsync();
   }

   public void RemovePlaylist(Playlist playlist)
   {
      context.Playlists.Remove(playlist);
   }
}
