using API.Data;
using API.Interfaces.IRepositories;

namespace API.Repositories;

public class UnitOfWork(
    DataContext context,
    IAlbumRepository albumRepository,
    IGenreRepository genreRepository,
    IPlaylistRepository playlistRepository,
    ISongRepository songRepository,
    IUserRepository userRepository
) : IUnitOfWork
{
    public IAlbumRepository AlbumRepository => albumRepository;
    public IGenreRepository GenreRepository => genreRepository;
    public IPlaylistRepository PlaylistRepository => playlistRepository;
    public ISongRepository SongRepository => songRepository;
    public IUserRepository UserRepository => userRepository;

    public async Task<bool> Complete()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return context.ChangeTracker.HasChanges();
    }
}
