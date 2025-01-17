﻿#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class SqlInitial : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AspNetRoles",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetRoles", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "AspNetUsers",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                FirstName = table.Column<string>(type: "text", nullable: false),
                LastName = table.Column<string>(type: "text", nullable: false),
                ArtistName = table.Column<string>(type: "text", nullable: true),
                Gender = table.Column<string>(type: "text", nullable: false),
                DateOfBirth = table.Column<DateOnly>(type: "date", nullable: false),
                About = table.Column<string>(type: "text", nullable: true),
                State = table.Column<string>(type: "text", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                PasswordHash = table.Column<string>(type: "text", nullable: true),
                SecurityStamp = table.Column<string>(type: "text", nullable: true),
                ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                PhoneNumber = table.Column<string>(type: "text", nullable: true),
                PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUsers", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Genres",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                GenreName = table.Column<string>(type: "text", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Genres", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "SubscriptionPlans",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                PlanName = table.Column<string>(type: "text", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                PricePerMonth = table.Column<decimal>(type: "numeric", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "AspNetRoleClaims",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                RoleId = table.Column<int>(type: "integer", nullable: false),
                ClaimType = table.Column<string>(type: "text", nullable: true),
                ClaimValue = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                table.ForeignKey(
                    name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                    column: x => x.RoleId,
                    principalTable: "AspNetRoles",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Albums",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                AlbumName = table.Column<string>(type: "text", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                TotalListeningHours = table.Column<int>(type: "integer", nullable: false),
                TotalViews = table.Column<int>(type: "integer", nullable: false),
                TotalSongs = table.Column<int>(type: "integer", nullable: false),
                TotalDuration = table.Column<string>(type: "text", nullable: false),
                State = table.Column<string>(type: "text", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                PublisherId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Albums", x => x.Id);
                table.ForeignKey(
                    name: "FK_Albums_AspNetUsers_PublisherId",
                    column: x => x.PublisherId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AspNetUserClaims",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                UserId = table.Column<int>(type: "integer", nullable: false),
                ClaimType = table.Column<string>(type: "text", nullable: true),
                ClaimValue = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                table.ForeignKey(
                    name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AspNetUserLogins",
            columns: table => new
            {
                LoginProvider = table.Column<string>(type: "text", nullable: false),
                ProviderKey = table.Column<string>(type: "text", nullable: false),
                ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                UserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                table.ForeignKey(
                    name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AspNetUserRoles",
            columns: table => new
            {
                UserId = table.Column<int>(type: "integer", nullable: false),
                RoleId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                table.ForeignKey(
                    name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                    column: x => x.RoleId,
                    principalTable: "AspNetRoles",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AspNetUserTokens",
            columns: table => new
            {
                UserId = table.Column<int>(type: "integer", nullable: false),
                LoginProvider = table.Column<string>(type: "text", nullable: false),
                Name = table.Column<string>(type: "text", nullable: false),
                Value = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                table.ForeignKey(
                    name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Notifications",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Title = table.Column<string>(type: "text", nullable: true),
                Content = table.Column<string>(type: "text", nullable: false),
                Type = table.Column<string>(type: "text", nullable: false),
                NotifyEntityId = table.Column<int>(type: "integer", nullable: true),
                IsRead = table.Column<bool>(type: "boolean", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Notifications", x => x.Id);
                table.ForeignKey(
                    name: "FK_Notifications_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Payment",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Amount = table.Column<int>(type: "integer", nullable: false),
                PaymentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                PaymentMethod = table.Column<string>(type: "text", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                ListenerId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Payment", x => x.Id);
                table.ForeignKey(
                    name: "FK_Payment_AspNetUsers_ListenerId",
                    column: x => x.ListenerId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Playlists",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                PlaylistName = table.Column<string>(type: "text", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                TotalListeningHours = table.Column<int>(type: "integer", nullable: false),
                TotalSongs = table.Column<int>(type: "integer", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                PublisherId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Playlists", x => x.Id);
                table.ForeignKey(
                    name: "FK_Playlists_AspNetUsers_PublisherId",
                    column: x => x.PublisherId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Songs",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                SongName = table.Column<string>(type: "text", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                TotalListeningHours = table.Column<int>(type: "integer", nullable: false),
                TotalViews = table.Column<int>(type: "integer", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                MusicUrl = table.Column<string>(type: "text", nullable: false),
                MusicPublicId = table.Column<string>(type: "text", nullable: true),
                Duration = table.Column<string>(type: "text", nullable: false),
                LyricUrl = table.Column<string>(type: "text", nullable: true),
                LyricPublicId = table.Column<string>(type: "text", nullable: true),
                State = table.Column<string>(type: "text", nullable: false),
                PublisherId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Songs", x => x.Id);
                table.ForeignKey(
                    name: "FK_Songs_AspNetUsers_PublisherId",
                    column: x => x.PublisherId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "UserPhotos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                UserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserPhotos", x => x.Id);
                table.ForeignKey(
                    name: "FK_UserPhotos_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "UserPlan",
            columns: table => new
            {
                UserId = table.Column<int>(type: "integer", nullable: false),
                PlanId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserPlan", x => new { x.UserId, x.PlanId });
                table.ForeignKey(
                    name: "FK_UserPlan_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_UserPlan_SubscriptionPlans_PlanId",
                    column: x => x.PlanId,
                    principalTable: "SubscriptionPlans",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AlbumGenres",
            columns: table => new
            {
                AlbumId = table.Column<int>(type: "integer", nullable: false),
                GenreId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AlbumGenres", x => new { x.AlbumId, x.GenreId });
                table.ForeignKey(
                    name: "FK_AlbumGenres_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_AlbumGenres_Genres_GenreId",
                    column: x => x.GenreId,
                    principalTable: "Genres",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AlbumPhotos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                AlbumId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AlbumPhotos", x => x.Id);
                table.ForeignKey(
                    name: "FK_AlbumPhotos_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "ArtistAlbums",
            columns: table => new
            {
                ArtistId = table.Column<int>(type: "integer", nullable: false),
                AlbumId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ArtistAlbums", x => new { x.ArtistId, x.AlbumId });
                table.ForeignKey(
                    name: "FK_ArtistAlbums_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_ArtistAlbums_AspNetUsers_ArtistId",
                    column: x => x.ArtistId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "FavoriteAlbums",
            columns: table => new
            {
                UserId = table.Column<int>(type: "integer", nullable: false),
                AlbumId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_FavoriteAlbums", x => new { x.UserId, x.AlbumId });
                table.ForeignKey(
                    name: "FK_FavoriteAlbums_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_FavoriteAlbums_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "AlbumSongs",
            columns: table => new
            {
                AlbumId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false),
                Order = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AlbumSongs", x => new { x.AlbumId, x.SongId });
                table.ForeignKey(
                    name: "FK_AlbumSongs_Albums_AlbumId",
                    column: x => x.AlbumId,
                    principalTable: "Albums",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_AlbumSongs_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "ArtistSongs",
            columns: table => new
            {
                ArtistId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_ArtistSongs", x => new { x.ArtistId, x.SongId });
                table.ForeignKey(
                    name: "FK_ArtistSongs_AspNetUsers_ArtistId",
                    column: x => x.ArtistId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_ArtistSongs_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Comments",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Content = table.Column<string>(type: "text", nullable: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                PublisherId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Comments", x => x.Id);
                table.ForeignKey(
                    name: "FK_Comments_AspNetUsers_PublisherId",
                    column: x => x.PublisherId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_Comments_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Downloads",
            columns: table => new
            {
                UserId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false),
                Count = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Downloads", x => new { x.UserId, x.SongId });
                table.ForeignKey(
                    name: "FK_Downloads_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id");
                table.ForeignKey(
                    name: "FK_Downloads_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id");
            });

        migrationBuilder.CreateTable(
            name: "FavoriteSongs",
            columns: table => new
            {
                UserId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_FavoriteSongs", x => new { x.UserId, x.SongId });
                table.ForeignKey(
                    name: "FK_FavoriteSongs_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_FavoriteSongs_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "PlaylistSongs",
            columns: table => new
            {
                PlaylistId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_PlaylistSongs", x => new { x.PlaylistId, x.SongId });
                table.ForeignKey(
                    name: "FK_PlaylistSongs_Playlists_PlaylistId",
                    column: x => x.PlaylistId,
                    principalTable: "Playlists",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_PlaylistSongs_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "SongGenres",
            columns: table => new
            {
                SongId = table.Column<int>(type: "integer", nullable: false),
                GenreId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SongGenres", x => new { x.SongId, x.GenreId });
                table.ForeignKey(
                    name: "FK_SongGenres_Genres_GenreId",
                    column: x => x.GenreId,
                    principalTable: "Genres",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_SongGenres_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "SongPhotos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SongPhotos", x => x.Id);
                table.ForeignKey(
                    name: "FK_SongPhotos_Songs_SongId",
                    column: x => x.SongId,
                    principalTable: "Songs",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_AlbumGenres_GenreId",
            table: "AlbumGenres",
            column: "GenreId");

        migrationBuilder.CreateIndex(
            name: "IX_AlbumPhotos_AlbumId",
            table: "AlbumPhotos",
            column: "AlbumId");

        migrationBuilder.CreateIndex(
            name: "IX_Albums_PublisherId",
            table: "Albums",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_AlbumSongs_SongId",
            table: "AlbumSongs",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_ArtistAlbums_AlbumId",
            table: "ArtistAlbums",
            column: "AlbumId");

        migrationBuilder.CreateIndex(
            name: "IX_ArtistSongs_SongId",
            table: "ArtistSongs",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_AspNetRoleClaims_RoleId",
            table: "AspNetRoleClaims",
            column: "RoleId");

        migrationBuilder.CreateIndex(
            name: "RoleNameIndex",
            table: "AspNetRoles",
            column: "NormalizedName",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_AspNetUserClaims_UserId",
            table: "AspNetUserClaims",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_AspNetUserLogins_UserId",
            table: "AspNetUserLogins",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_AspNetUserRoles_RoleId",
            table: "AspNetUserRoles",
            column: "RoleId");

        migrationBuilder.CreateIndex(
            name: "EmailIndex",
            table: "AspNetUsers",
            column: "NormalizedEmail");

        migrationBuilder.CreateIndex(
            name: "UserNameIndex",
            table: "AspNetUsers",
            column: "NormalizedUserName",
            unique: true);

        migrationBuilder.CreateIndex(
            name: "IX_Comments_PublisherId",
            table: "Comments",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_Comments_SongId",
            table: "Comments",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_Downloads_SongId",
            table: "Downloads",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_FavoriteAlbums_AlbumId",
            table: "FavoriteAlbums",
            column: "AlbumId");

        migrationBuilder.CreateIndex(
            name: "IX_FavoriteSongs_SongId",
            table: "FavoriteSongs",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_Notifications_UserId",
            table: "Notifications",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_Payment_ListenerId",
            table: "Payment",
            column: "ListenerId");

        migrationBuilder.CreateIndex(
            name: "IX_Playlists_PublisherId",
            table: "Playlists",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_PlaylistSongs_SongId",
            table: "PlaylistSongs",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_SongGenres_GenreId",
            table: "SongGenres",
            column: "GenreId");

        migrationBuilder.CreateIndex(
            name: "IX_SongPhotos_SongId",
            table: "SongPhotos",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_Songs_PublisherId",
            table: "Songs",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_UserPhotos_UserId",
            table: "UserPhotos",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_UserPlan_PlanId",
            table: "UserPlan",
            column: "PlanId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AlbumGenres");

        migrationBuilder.DropTable(
            name: "AlbumPhotos");

        migrationBuilder.DropTable(
            name: "AlbumSongs");

        migrationBuilder.DropTable(
            name: "ArtistAlbums");

        migrationBuilder.DropTable(
            name: "ArtistSongs");

        migrationBuilder.DropTable(
            name: "AspNetRoleClaims");

        migrationBuilder.DropTable(
            name: "AspNetUserClaims");

        migrationBuilder.DropTable(
            name: "AspNetUserLogins");

        migrationBuilder.DropTable(
            name: "AspNetUserRoles");

        migrationBuilder.DropTable(
            name: "AspNetUserTokens");

        migrationBuilder.DropTable(
            name: "Comments");

        migrationBuilder.DropTable(
            name: "Downloads");

        migrationBuilder.DropTable(
            name: "FavoriteAlbums");

        migrationBuilder.DropTable(
            name: "FavoriteSongs");

        migrationBuilder.DropTable(
            name: "Notifications");

        migrationBuilder.DropTable(
            name: "Payment");

        migrationBuilder.DropTable(
            name: "PlaylistSongs");

        migrationBuilder.DropTable(
            name: "SongGenres");

        migrationBuilder.DropTable(
            name: "SongPhotos");

        migrationBuilder.DropTable(
            name: "UserPhotos");

        migrationBuilder.DropTable(
            name: "UserPlan");

        migrationBuilder.DropTable(
            name: "AspNetRoles");

        migrationBuilder.DropTable(
            name: "Albums");

        migrationBuilder.DropTable(
            name: "Playlists");

        migrationBuilder.DropTable(
            name: "Genres");

        migrationBuilder.DropTable(
            name: "Songs");

        migrationBuilder.DropTable(
            name: "SubscriptionPlans");

        migrationBuilder.DropTable(
            name: "AspNetUsers");
    }
}
