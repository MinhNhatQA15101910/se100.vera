namespace API.Interfaces.IRepositories;

public interface IUnitOfWork
{
    IAlbumRepository AlbumRepository { get; }
    IAlbumSongRepository AlbumSongRepository { get; }
    IArtistSongRepository ArtistSongRepository { get; }
    IGenreRepository GenreRepository { get; }
    IPlaylistRepository PlaylistRepository { get; }
    IPlaylistSongRepository PlaylistSongRepository { get; }
    ISongGenreRepository SongGenreRepository { get; }
    ISongRepository SongRepository { get; }
    IUserRepository UserRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
}
