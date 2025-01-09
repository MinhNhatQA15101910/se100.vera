using API.DTOs.Statistic;
using API.Helpers;
using API.Interfaces.IRepositories;

namespace API.Controllers;

public class StatisticController(
   IUnitOfWork unitOfWork
) : BaseApiController
{
   [HttpGet]
   [Authorize(Roles = "Admin")]
   public async Task<ActionResult<StatisticDto>> GetAllStatistics()
   {
      var totalSongs = unitOfWork.SongRepository.GetTotalSongs();
      var totalUsers = unitOfWork.UserRepository.GetTotalUsers();
      var totalArtists = unitOfWork.UserRepository.GetTotalArtists();
      var totalAlbums = unitOfWork.AlbumRepository.GetTotalAlbums();
      var totalPlaylists = unitOfWork.PlaylistRepository.GetTotalPlaylists();
      var totalGenres = unitOfWork.GenreRepository.GetTotalGenres();

      var statistics = new StatisticDto
      {
         totalSongs = totalSongs,
         totalUsers = totalUsers,
         totalArtists = totalArtists,
         totalAlbums = totalAlbums,
         totalPlaylists = totalPlaylists,
         totalGenres = totalGenres
      };

      return await Task.FromResult(Ok(statistics));
   }
}
