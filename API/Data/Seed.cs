using API.Entities;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(
        UserManager<AppUser> userManager,
        RoleManager<AppRole> roleManager
    )
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        if (!await roleManager.Roles.AnyAsync())
        {
            var roles = new List<AppRole>
            {
                new() { Name = "Listener" },
                new() { Name = "Artist" },
                new() { Name = "Admin" }
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$$w0rd");

            if (user.FirstName == "Admin")
            {
                await userManager.AddToRoleAsync(user, "Admin");
            }
            else if (user.ArtistName != null)
            {
                await userManager.AddToRoleAsync(user, "Artist");
            }
            else
            {
                await userManager.AddToRoleAsync(user, "Listener");
            }
        }
    }

    public static async Task SeedGenres(DataContext context)
    {
        if (await context.Genres.AnyAsync()) return;

        var genreData = await File.ReadAllTextAsync("Data/GenreSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var genres = JsonSerializer.Deserialize<List<Genre>>(genreData, options);

        if (genres == null) return;

        foreach (var genre in genres)
        {
            context.Genres.Add(genre);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedSongs(DataContext context)
    {
        if (await context.Songs.AnyAsync()) return;

        var songData = await File.ReadAllTextAsync("Data/SongSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var songs = JsonSerializer.Deserialize<List<Song>>(songData, options);

        if (songs == null) return;

        foreach (var song in songs)
        {
            context.Songs.Add(song);
        }

        await context.SaveChangesAsync();

        await SeedSongGenres(context);
        await SeedArtistSongs(context);
    }

    public static async Task SeedSongGenres(DataContext context)
    {
        var songs = await context.Songs.ToListAsync();

        foreach (var song in songs)
        {
            var songGenre = new SongGenre
            {
                SongId = song.Id,
                GenreId = Random.Shared.Next(1, 15)
            };

            context.SongGenres.Add(songGenre);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedArtistSongs(DataContext context)
    {
        var songs = await context.Songs.ToListAsync();

        foreach (var song in songs)
        {
            var artistSongs = new List<ArtistSong>
            {
                new() {
                    SongId = song.Id,
                    ArtistId = song.PublisherId
                },
                new() {
                    SongId = song.Id,
                    ArtistId = ((song.PublisherId - 2) % 6) + 3
                }
            };

            context.ArtistSongs.AddRange(artistSongs);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedAlbums(DataContext context)
    {
        if (await context.Albums.AnyAsync()) return;

        var albumData = await File.ReadAllTextAsync("Data/AlbumSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var albums = JsonSerializer.Deserialize<List<Album>>(albumData, options);

        if (albums == null) return;

        foreach (var album in albums)
        {
            context.Albums.Add(album);
        }

        await context.SaveChangesAsync();

        await SeedAlbumSongs(context);
        await SeedAlbumGenres(context);
        await SeedArtistAlbums(context);
    }

    private static async Task SeedAlbumSongs(DataContext context)
    {
        var albums = await context.Albums.ToListAsync();

        foreach (var album in albums)
        {
            var albumSongs = new List<AlbumSong>
            {
                new() {
                    AlbumId = album.Id,
                    SongId = album.Id * 2 - 1,
                    Order = 1
                },
                new() {
                    AlbumId = album.Id,
                    SongId = album.Id * 2,
                    Order = 2
                }
            };

            context.AlbumSongs.AddRange(albumSongs);
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedAlbumGenres(DataContext context)
    {
        var albums = await context.Albums.ToListAsync();

        foreach (var album in albums)
        {
            var albumGenre = new AlbumGenre
            {
                AlbumId = album.Id,
                GenreId = Random.Shared.Next(1, 15)
            };

            context.AlbumGenres.Add(albumGenre);
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedArtistAlbums(DataContext context)
    {
        var albums = await context.Albums.ToListAsync();

        foreach (var album in albums)
        {
            var artistAlbums = new List<ArtistAlbum>
            {
                new() {
                    AlbumId = album.Id,
                    ArtistId = album.PublisherId
                },
                new() {
                    AlbumId = album.Id,
                    ArtistId = ((album.PublisherId - 2) % 6) + 3
                }
            };

            context.ArtistAlbums.AddRange(artistAlbums);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedSubscriptionPlans(DataContext context)
    {
        if (await context.SubscriptionPlans.AnyAsync()) return;

        var subscriptionPlanData = await File.ReadAllTextAsync("Data/SubscriptionPlanSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var subscriptionPlans = JsonSerializer.Deserialize<List<SubscriptionPlan>>(subscriptionPlanData, options);

        if (subscriptionPlans == null) return;

        foreach (var plan in subscriptionPlans)
        {
            context.SubscriptionPlans.Add(plan);
        }

        await context.SaveChangesAsync();
    }
}
