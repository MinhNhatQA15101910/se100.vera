using API.Data;
using API.Helpers;
using API.Interfaces.IRepositories;
using API.Interfaces.IServices;
using API.Repositories;
using API.Services;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.AddSingleton<PincodeStore>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAlbumRepository, AlbumRepository>();
        services.AddScoped<IAlbumSongRepository, AlbumSongRepository>();
        services.AddScoped<IArtistSongRepository, ArtistSongRepository>();
        services.AddScoped<IPlaylistRepository, PlaylistRepository>();
        services.AddScoped<IPlaylistSongRepository, PlaylistSongRepository>();
        services.AddScoped<IGenreRepository, GenreRepository>();
        services.AddScoped<ISongRepository, SongRepository>();
        services.AddScoped<ISongGenreRepository, SongGenreRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.Configure<EmailSenderSettings>(config.GetSection("EmailSenderSettings"));

        return services;
    }
}
