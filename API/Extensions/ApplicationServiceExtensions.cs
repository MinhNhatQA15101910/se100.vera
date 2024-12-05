using API.Data;
using API.Helpers;
using API.Interfaces;
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
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IPhotoRepository, PhotoRepository>();
        services.AddScoped<ISongRepository, SongRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.Configure<EmailSenderSettings>(config.GetSection("EmailSenderSettings"));

        return services;
    }
}
