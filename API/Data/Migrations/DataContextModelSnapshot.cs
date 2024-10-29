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

                b.ToTable("AlbumPhoto");
            });

        modelBuilder.Entity("API.Entities.AlbumSong", b =>
            {
                b.Property<int>("AlbumId")
                    .HasColumnType("integer");

                b.Property<int>("SongId")
                    .HasColumnType("integer");

                b.HasKey("AlbumId", "SongId");

                b.HasIndex("SongId");

                b.ToTable("AlbumSongs");
            });

        modelBuilder.Entity("API.Entities.AppAlbum", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("AlbumName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("TotalSongs")
                    .HasColumnType("integer");

                b.Property<int>("TotalViews")
                    .HasColumnType("integer");

                b.Property<DateTime>("UploadDate")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.ToTable("Albums");
            });

        modelBuilder.Entity("API.Entities.AppGenre", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("GenreName")
                    .IsRequired()
                    .HasColumnType("text");

                b.HasKey("Id");

                b.ToTable("Genres");
            });

        modelBuilder.Entity("API.Entities.AppPlaylist", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("AlbumImageUrl")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("PlaylistName")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<int>("TotalSong")
                    .HasColumnType("integer");

                b.Property<int>("TotalView")
                    .HasColumnType("integer");

                b.Property<DateTime>("UploadDate")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.ToTable("Playlists");
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

        modelBuilder.Entity("API.Entities.AppSong", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("integer");

                NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                b.Property<string>("Description")
                    .IsRequired()
                    .HasColumnType("text");

                b.Property<string>("LyricPublicId")
                    .HasColumnType("text");

                b.Property<string>("LyricUrl")
                    .IsRequired()
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

                b.Property<int>("TotalView")
                    .HasColumnType("integer");

                b.Property<DateTime>("UploadDate")
                    .HasColumnType("timestamp with time zone");

                b.HasKey("Id");

                b.HasIndex("PublisherId");

                b.ToTable("Songs");
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

                b.Property<DateTime>("Created")
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

        modelBuilder.Entity("API.Entities.AlbumPhoto", b =>
            {
                b.HasOne("API.Entities.AppAlbum", "Album")
                    .WithMany("Photos")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");
            });

        modelBuilder.Entity("API.Entities.AlbumSong", b =>
            {
                b.HasOne("API.Entities.AppAlbum", "Album")
                    .WithMany("Songs")
                    .HasForeignKey("AlbumId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.AppSong", "Song")
                    .WithMany("Albums")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Album");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.AppSong", b =>
            {
                b.HasOne("API.Entities.AppUser", "Publisher")
                    .WithMany()
                    .HasForeignKey("PublisherId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Publisher");
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

        modelBuilder.Entity("API.Entities.ArtistSong", b =>
            {
                b.HasOne("API.Entities.AppUser", "Artist")
                    .WithMany("Songs")
                    .HasForeignKey("ArtistId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.HasOne("API.Entities.AppSong", "Song")
                    .WithMany("Artists")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Artist");

                b.Navigation("Song");
            });

        modelBuilder.Entity("API.Entities.SongPhoto", b =>
            {
                b.HasOne("API.Entities.AppSong", "Song")
                    .WithMany("Photos")
                    .HasForeignKey("SongId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();

                b.Navigation("Song");
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

        modelBuilder.Entity("API.Entities.AppAlbum", b =>
            {
                b.Navigation("Photos");

                b.Navigation("Songs");
            });

        modelBuilder.Entity("API.Entities.AppRole", b =>
            {
                b.Navigation("UserRoles");
            });

        modelBuilder.Entity("API.Entities.AppSong", b =>
            {
                b.Navigation("Albums");

                b.Navigation("Artists");

                b.Navigation("Photos");
            });

        modelBuilder.Entity("API.Entities.AppUser", b =>
            {
                b.Navigation("Photos");

                b.Navigation("Songs");

                b.Navigation("UserRoles");
            });
#pragma warning restore 612, 618
    }
}
