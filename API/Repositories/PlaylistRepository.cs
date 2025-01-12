using API.Data;
using API.DTOs.Playlists;
using API.Entities;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class PlaylistRepository(DataContext context, IMapper mapper) : IPlaylistRepository
{
   public void CreatePlaylist(Playlist playlist)
   {
      context.Playlists.Add(playlist);
   }

   public Task<Playlist?> GetPlaylistByIdAsync(int id)
   {
      return context.Playlists
         // Include publisher
         .Include(p => p.Publisher).ThenInclude(p => p.Photos)
         // Include song photos
         .Include(p => p.Songs).ThenInclude(ps => ps.Song)
         .ThenInclude(s => s.Photos)
         // Include song genres
         .Include(p => p.Songs).ThenInclude(ps => ps.Song)
         .ThenInclude(s => s.Genres).ThenInclude(sg => sg.Genre)
         // Include song artists
         .Include(p => p.Songs).ThenInclude(ps => ps.Song)
         .ThenInclude(s => s.Artists).ThenInclude(sa => sa.Artist)
         // Execute query
         .FirstOrDefaultAsync(p => p.Id == id);
   }

   public Task<Playlist?> GetPlaylistByNameAsync(int userId, string playlistName)
   {
      return context.Playlists
         .FirstOrDefaultAsync(p => p.PlaylistName == playlistName && p.PublisherId == userId);
   }

   public async Task<PagedList<PlaylistDto>> GetPlaylistsAsync(PlaylistParams playlistParams)
   {
      var query = context.Playlists.AsQueryable();

      if (playlistParams.Keyword != null)
      {
         query = query.Where(p => p.PlaylistName.ToLower().Contains(playlistParams.Keyword.ToLower()));
      }

      if (playlistParams.PublisherId != null)
      {
         query = query.Where(p => p.PublisherId.ToString() == playlistParams.PublisherId);
      }

      query = playlistParams.OrderBy switch
      {
         "playlistName" => playlistParams.SortBy == "asc"
            ? query.OrderBy(p => p.PlaylistName)
            : query.OrderByDescending(p => p.PlaylistName),
         "createdAt" => playlistParams.SortBy == "asc"
            ? query.OrderBy(p => p.CreatedAt)
            : query.OrderByDescending(p => p.CreatedAt),
         _ => query.OrderByDescending(p => p.CreatedAt)
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
