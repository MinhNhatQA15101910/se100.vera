namespace API.Interfaces.IRepositories;

public interface IUnitOfWork
{
    IAlbumRepository AlbumRepository { get; }
    IGenreRepository GenreRepository { get; }
    IPlaylistRepository PlaylistRepository { get; }
    ISongRepository SongRepository { get; }
    IUserRepository UserRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
