﻿// <auto-generated />
#nullable disable

namespace API.Data.Migrations;

[DbContext(typeof(DataContext))]
partial class DataContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
#pragma warning disable 612, 618
        modelBuilder
            .HasAnnotation("ProductVersion", "8.0.10")
            .HasAnnotation("Relational:MaxIdentifierLength", 63);

        NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

        modelBuilder.Entity("API.Entities.Album", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("AlbumName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("PublisherId")
                    .HasColumnType("integer");

                b.Property<string>("State")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("TotalDuration")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("TotalListeningHours")
                    .HasColumnType("integer");

                b.Property<int>("TotalSongs")
                    .HasColumnType("integer");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("PublisherId");

                b.ToTable("Albums");
            });

        modelBuilder.Entity("API.Entities.AlbumFavorite", b =>
            {
                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.Property<int>("AlbumId")
                    .HasColumnType("integer");

                b.HasKey("UserId", "AlbumId");

                b.HasIndex("AlbumId");

                b.ToTable("FavoriteAlbums");
            });

        modelBuilder.Entity("API.Entities.AlbumGenre", b =>
            {
                b.Property<int>("AlbumId")
                    .HasColumnType("integer");

                b.Property<int>("GenreId")
                    .HasColumnType("integer");

                b.HasKey("AlbumId", "GenreId");

                b.HasIndex("GenreId");

                b.ToTable("AlbumGenres");
            });

        modelBuilder.Entity("API.Entities.AlbumPhoto", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("AlbumId")
                    .HasColumnType("integer");

                b.Property<bool>("IsMain")
                    .HasColumnType("boolean");

                b.Property<string>("PublicId")
                    .HasColumnType("text");

                b.Property<string>("Url")
                    .IsRequired()
                    .HasColumnType("text");

                b.HasKey("Id");

                b.HasIndex("AlbumId");

                b.ToTable("AlbumPhotos");
            });

        modelBuilder.Entity("API.Entities.AlbumSong", b =>
            {
                b.Property<int>("AlbumId")
                    .HasColumnType("integer");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.Property<int>("Order")
                    .HasColumnType("integer");

                b.HasKey("AlbumId", "SongId");

                b.HasIndex("SongId");

                b.ToTable("AlbumSongs");
            });

        modelBuilder.Entity("API.Entities.AppRole", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("ConcurrencyStamp")
                    .IsConcurrencyToken()
                    .HasColumnType("text");

                b.Property<string>("Name")
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.Property<string>("NormalizedName")
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.HasKey("Id");

                b.HasIndex("NormalizedName")
                    .IsUnique()
                    .HasDatabaseName("RoleNameIndex");

                b.ToTable("AspNetRoles", (string)null);
            });

        modelBuilder.Entity("API.Entities.AppUser", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("About")
                    .HasColumnType("text");

                b.Property<int>("AccessFailedCount")
                    .HasColumnType("integer");

                b.Property<string>("ArtistName")
                    .HasColumnType("text");

                b.Property<string>("ConcurrencyStamp")
                    .IsConcurrencyToken()
                    .HasColumnType("text");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<DateOnly>("DateOfBirth")
                    .HasColumnType("date");

                b.Property<string>("Email")
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.Property<bool>("EmailConfirmed")
                    .HasColumnType("boolean");

                b.Property<string>("FirstName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("Gender")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("LastName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<bool>("LockoutEnabled")
                    .HasColumnType("boolean");

                b.Property<DateTimeOffset?>("LockoutEnd")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("NormalizedEmail")
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.Property<string>("NormalizedUserName")
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.Property<string>("PasswordHash")
                    .HasColumnType("text");

                b.Property<string>("PhoneNumber")
                    .HasColumnType("text");

                b.Property<bool>("PhoneNumberConfirmed")
                    .HasColumnType("boolean");

                b.Property<string>("SecurityStamp")
                    .HasColumnType("text");

                b.Property<bool>("TwoFactorEnabled")
                    .HasColumnType("boolean");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("UserName")
                    .HasMaxLength(256)
                    .HasColumnType("character varying(256)");

                b.HasKey("Id");

                b.HasIndex("NormalizedEmail")
                    .HasDatabaseName("EmailIndex");

                b.HasIndex("NormalizedUserName")
                    .IsUnique()
                    .HasDatabaseName("UserNameIndex");

                b.ToTable("AspNetUsers", (string)null);
            });

        modelBuilder.Entity("API.Entities.AppUserRole", b =>
            {
                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.Property<int>("RoleId")
                    .HasColumnType("integer");

                b.HasKey("UserId", "RoleId");

                b.HasIndex("RoleId");

                b.ToTable("AspNetUserRoles", (string)null);
            });

        modelBuilder.Entity("API.Entities.ArtistAlbum", b =>
            {
                b.Property<int>("ArtistId")
                    .HasColumnType("integer");

                b.Property<int>("AlbumId")
                    .HasColumnType("integer");

                b.HasKey("ArtistId", "AlbumId");

                b.HasIndex("AlbumId");

                b.ToTable("ArtistAlbums");
            });

        modelBuilder.Entity("API.Entities.ArtistSong", b =>
            {
                b.Property<int>("ArtistId")
                    .HasColumnType("integer");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.HasKey("ArtistId", "SongId");

                b.HasIndex("SongId");

                b.ToTable("ArtistSongs");
            });

        modelBuilder.Entity("API.Entities.Comment", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Content")
                    .HasColumnType("text");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<int>("PublisherId")
                    .HasColumnType("integer");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("PublisherId");

                b.HasIndex("SongId");

                b.ToTable("Comments");
            });

        modelBuilder.Entity("API.Entities.CommentPhoto", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("CommentId")
                    .HasColumnType("integer");

                b.Property<bool>("IsMain")
                    .HasColumnType("boolean");

                b.Property<string>("PublicId")
                    .HasColumnType("text");

                b.Property<string>("Url")
                    .IsRequired()
                    .HasColumnType("text");

                b.HasKey("Id");

                b.HasIndex("CommentId");

                b.ToTable("CommentPhotos");
            });

        modelBuilder.Entity("API.Entities.Genre", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("GenreName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.ToTable("Genres");
            });

        modelBuilder.Entity("API.Entities.Notification", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Content")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<bool>("IsRead")
                    .HasColumnType("boolean");

                b.Property<string>("NotifyEntityId")
                    .HasColumnType("text");

                b.Property<string>("PhotoPublicId")
                    .HasColumnType("text");

                b.Property<string>("PhotoUrl")
                    .HasColumnType("text");

                b.Property<string>("Title")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("Type")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.HasKey("Id");

                b.HasIndex("UserId");

                b.ToTable("Notifications");
            });

        modelBuilder.Entity("API.Entities.Payment", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<int>("Amount")
                    .HasColumnType("integer");

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<int>("ListenerId")
                    .HasColumnType("integer");

                b.Property<DateTime>("PaymentDate")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("PaymentMethod")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("ListenerId");

                b.ToTable("Payments");
            });

        modelBuilder.Entity("API.Entities.PaymentDetail", b =>
            {
                b.Property<int>("PaymentId")
                    .HasColumnType("integer");

                b.Property<int>("SubscriptionPlanId")
                    .HasColumnType("integer");

                b.HasKey("PaymentId", "SubscriptionPlanId");

                b.HasIndex("SubscriptionPlanId");

                b.ToTable("PaymentDetails");
            });

        modelBuilder.Entity("API.Entities.Playlist", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("PlaylistName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("PublisherId")
                    .HasColumnType("integer");

                b.Property<int>("TotalListeningHours")
                    .HasColumnType("integer");

                b.Property<int>("TotalSongs")
                    .HasColumnType("integer");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<DateTime>("UploadDate")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("PublisherId");

                b.ToTable("Playlists");
            });

        modelBuilder.Entity("API.Entities.PlaylistSong", b =>
            {
                b.Property<int>("PlaylistId")
                    .HasColumnType("integer");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.HasKey("PlaylistId", "SongId");

                b.HasIndex("SongId");

                b.ToTable("PlaylistSongs");
            });

        modelBuilder.Entity("API.Entities.Song", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("Duration")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("LyricPublicId")
                    .HasColumnType("text");

                b.Property<string>("LyricUrl")
                    .HasColumnType("text");

                b.Property<string>("MusicPublicId")
                    .HasColumnType("text");

                b.Property<string>("MusicUrl")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("PublisherId")
                    .HasColumnType("integer");

                b.Property<string>("SongName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("State")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("TotalListeningHours")
                    .HasColumnType("integer");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("PublisherId");

                b.ToTable("Songs");
            });

        modelBuilder.Entity("API.Entities.SongFavorite", b =>
            {
                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.HasKey("UserId", "SongId");

                b.HasIndex("SongId");

                b.ToTable("FavoriteSongs");
            });

        modelBuilder.Entity("API.Entities.SongGenre", b =>
            {
                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.Property<int>("GenreId")
                    .HasColumnType("integer");

                b.HasKey("SongId", "GenreId");

                b.HasIndex("GenreId");

                b.ToTable("SongGenres");
            });

        modelBuilder.Entity("API.Entities.SongPhoto", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<bool>("IsMain")
                    .HasColumnType("boolean");

                b.Property<string>("PublicId")
                    .HasColumnType("text");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.Property<string>("Url")
                    .IsRequired()
                    .HasColumnType("text");

                b.HasKey("Id");

                b.HasIndex("SongId");

                b.ToTable("SongPhotos");
            });

        modelBuilder.Entity("API.Entities.SubscriptionPlan", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<DateTime>("CreatedAt")
                    .HasColumnType("timestamp with time zone");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("ListenerId")
                    .HasColumnType("integer");

                b.Property<string>("PlanName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<decimal>("Price")
                    .HasColumnType("numeric");

                b.Property<DateTime>("UpdatedAt")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("ListenerId");

                b.ToTable("SubscriptionPlans");
            });

        modelBuilder.Entity("API.Entities.UserPhoto", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<bool>("IsMain")
                    .HasColumnType("boolean");

                b.Property<string>("PublicId")
                    .HasColumnType("text");

                b.Property<string>("Url")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.HasKey("Id");

                b.HasIndex("UserId");

                b.ToTable("UserPhotos");
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("ClaimType")
                    .HasColumnType("text");

                b.Property<string>("ClaimValue")
                    .HasColumnType("text");

                b.Property<int>("RoleId")
                    .HasColumnType("integer");

                b.HasKey("Id");

                b.HasIndex("RoleId");

                b.ToTable("AspNetRoleClaims", (string)null);
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("ClaimType")
                    .HasColumnType("text");

                b.Property<string>("ClaimValue")
                    .HasColumnType("text");

                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.HasKey("Id");

                b.HasIndex("UserId");

                b.ToTable("AspNetUserClaims", (string)null);
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
            {
                b.Property<string>("LoginProvider")
                    .HasColumnType("text");

                b.Property<string>("ProviderKey")
                    .HasColumnType("text");

                b.Property<string>("ProviderDisplayName")
                    .HasColumnType("text");

                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.HasKey("LoginProvider", "ProviderKey");

                b.HasIndex("UserId");

                b.ToTable("AspNetUserLogins", (string)null);
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
            {
                b.Property<int>("UserId")
                    .HasColumnType("integer");

                b.Property<string>("LoginProvider")
                    .HasColumnType("text");

                b.Property<string>("Name")
                    .HasColumnType("text");

                b.Property<string>("Value")
                    .HasColumnType("text");

                b.HasKey("UserId", "LoginProvider", "Name");

                b.ToTable("AspNetUserTokens", (string)null);
            });

        modelBuilder.Entity("API.Entities.Album", b =>
            {
                b.HasOne("API.Entities.AppUser", "Publisher")
                    .WithMany("PublishedAlbums")
                    .HasForeignKey("PublisherId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Publisher");
            });

        modelBuilder.Entity("API.Entities.AlbumFavorite", b =>
            {
                b.HasOne("API.Entities.Album", "Album")
                    .WithMany("UserFavorites")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.AppUser", "User")
                    .WithMany("FavoriteAlbums")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");

                b.Navigation("User");
            });

        modelBuilder.Entity("API.Entities.AlbumGenre", b =>
            {
                b.HasOne("API.Entities.Album", "Album")
                    .WithMany("Genres")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.Genre", "Genre")
                    .WithMany("Albums")
                    .HasForeignKey("GenreId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");

                b.Navigation("Genre");
            });

        modelBuilder.Entity("API.Entities.AlbumPhoto", b =>
            {
                b.HasOne("API.Entities.Album", "Album")
                    .WithMany("Photos")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");
            });

        modelBuilder.Entity("API.Entities.AlbumSong", b =>
            {
                b.HasOne("API.Entities.Album", "Album")
                    .WithMany("Songs")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("Albums")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.AppUserRole", b =>
            {
                b.HasOne("API.Entities.AppRole", "Role")
                    .WithMany("UserRoles")
                    .HasForeignKey("RoleId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.AppUser", "User")
                    .WithMany("UserRoles")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Role");

                b.Navigation("User");
            });

        modelBuilder.Entity("API.Entities.ArtistAlbum", b =>
            {
                b.HasOne("API.Entities.Album", "Album")
                    .WithMany("Artists")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.AppUser", "Artist")
                    .WithMany("Albums")
                    .HasForeignKey("ArtistId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");

                b.Navigation("Artist");
            });

        modelBuilder.Entity("API.Entities.ArtistSong", b =>
            {
                b.HasOne("API.Entities.AppUser", "Artist")
                    .WithMany("Songs")
                    .HasForeignKey("ArtistId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("Artists")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Artist");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.Comment", b =>
            {
                b.HasOne("API.Entities.AppUser", "Publisher")
                    .WithMany("Comments")
                    .HasForeignKey("PublisherId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("Comments")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Publisher");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.CommentPhoto", b =>
            {
                b.HasOne("API.Entities.Comment", "Comment")
                    .WithMany("Photos")
                    .HasForeignKey("CommentId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Comment");
            });

        modelBuilder.Entity("API.Entities.Notification", b =>
            {
                b.HasOne("API.Entities.AppUser", "User")
                    .WithMany()
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("User");
            });

        modelBuilder.Entity("API.Entities.Payment", b =>
            {
                b.HasOne("API.Entities.AppUser", "Listener")
                    .WithMany("Payments")
                    .HasForeignKey("ListenerId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Listener");
            });

        modelBuilder.Entity("API.Entities.PaymentDetail", b =>
            {
                b.HasOne("API.Entities.Payment", "Payment")
                    .WithMany("SubscriptionPlans")
                    .HasForeignKey("PaymentId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.SubscriptionPlan", "SubscriptionPlan")
                    .WithMany("Payments")
                    .HasForeignKey("SubscriptionPlanId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Payment");

                b.Navigation("SubscriptionPlan");
            });

        modelBuilder.Entity("API.Entities.Playlist", b =>
            {
                b.HasOne("API.Entities.AppUser", "Publisher")
                    .WithMany("PublishedPlaylists")
                    .HasForeignKey("PublisherId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Publisher");
            });

        modelBuilder.Entity("API.Entities.PlaylistSong", b =>
            {
                b.HasOne("API.Entities.Playlist", "Playlist")
                    .WithMany("Songs")
                    .HasForeignKey("PlaylistId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("Playlists")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Playlist");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.Song", b =>
            {
                b.HasOne("API.Entities.AppUser", "Publisher")
                    .WithMany("PublishedSongs")
                    .HasForeignKey("PublisherId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Publisher");
            });

        modelBuilder.Entity("API.Entities.SongFavorite", b =>
            {
                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("UserFavorites")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.AppUser", "User")
                    .WithMany("FavoriteSongs")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Song");

                b.Navigation("User");
            });

        modelBuilder.Entity("API.Entities.SongGenre", b =>
            {
                b.HasOne("API.Entities.Genre", "Genre")
                    .WithMany("Songs")
                    .HasForeignKey("GenreId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("Genres")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Genre");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.SongPhoto", b =>
            {
                b.HasOne("API.Entities.Song", "Song")
                    .WithMany("Photos")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.SubscriptionPlan", b =>
            {
                b.HasOne("API.Entities.AppUser", "Listener")
                    .WithMany("SubscriptionPlans")
                    .HasForeignKey("ListenerId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Listener");
            });

        modelBuilder.Entity("API.Entities.UserPhoto", b =>
            {
                b.HasOne("API.Entities.AppUser", "User")
                    .WithMany("Photos")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("User");
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
            {
                b.HasOne("API.Entities.AppRole", null)
                    .WithMany()
                    .HasForeignKey("RoleId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
            {
                b.HasOne("API.Entities.AppUser", null)
                    .WithMany()
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
            {
                b.HasOne("API.Entities.AppUser", null)
                    .WithMany()
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
            });

        modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
            {
                b.HasOne("API.Entities.AppUser", null)
                    .WithMany()
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
            });

        modelBuilder.Entity("API.Entities.Album", b =>
            {
                b.Navigation("Artists");

                b.Navigation("Genres");

                b.Navigation("Photos");

                b.Navigation("Songs");

                b.Navigation("UserFavorites");
            });

        modelBuilder.Entity("API.Entities.AppRole", b =>
            {
                b.Navigation("UserRoles");
            });

        modelBuilder.Entity("API.Entities.AppUser", b =>
            {
                b.Navigation("Albums");

                b.Navigation("Comments");

                b.Navigation("FavoriteAlbums");

                b.Navigation("FavoriteSongs");

                b.Navigation("Payments");

                b.Navigation("Photos");

                b.Navigation("PublishedAlbums");

                b.Navigation("PublishedPlaylists");

                b.Navigation("PublishedSongs");

                b.Navigation("Songs");

                b.Navigation("SubscriptionPlans");

                b.Navigation("UserRoles");
            });

        modelBuilder.Entity("API.Entities.Comment", b =>
            {
                b.Navigation("Photos");
            });

        modelBuilder.Entity("API.Entities.Genre", b =>
            {
                b.Navigation("Albums");

                b.Navigation("Songs");
            });

        modelBuilder.Entity("API.Entities.Payment", b =>
            {
                b.Navigation("SubscriptionPlans");
            });

        modelBuilder.Entity("API.Entities.Playlist", b =>
            {
                b.Navigation("Songs");
            });

        modelBuilder.Entity("API.Entities.Song", b =>
            {
                b.Navigation("Albums");

                b.Navigation("Artists");

                b.Navigation("Comments");

                b.Navigation("Genres");

                b.Navigation("Photos");

                b.Navigation("Playlists");

                b.Navigation("UserFavorites");
            });

        modelBuilder.Entity("API.Entities.SubscriptionPlan", b =>
            {
                b.Navigation("Payments");
            });
#pragma warning restore 612, 618
    }
}
