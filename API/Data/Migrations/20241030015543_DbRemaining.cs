#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class DbRemaining : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_AlbumPhoto_Albums_AlbumId",
            table: "AlbumPhoto");

        migrationBuilder.DropPrimaryKey(
            name: "PK_AlbumPhoto",
            table: "AlbumPhoto");

        migrationBuilder.DropColumn(
            name: "AlbumImageUrl",
            table: "Playlists");

        migrationBuilder.RenameTable(
            name: "AlbumPhoto",
            newName: "AlbumPhotos");

        migrationBuilder.RenameColumn(
            name: "TotalView",
            table: "Songs",
            newName: "TotalViews");

        migrationBuilder.RenameColumn(
            name: "TotalView",
            table: "Playlists",
            newName: "TotalViews");

        migrationBuilder.RenameColumn(
            name: "TotalSong",
            table: "Playlists",
            newName: "TotalSongs");

        migrationBuilder.RenameIndex(
            name: "IX_AlbumPhoto_AlbumId",
            table: "AlbumPhotos",
            newName: "IX_AlbumPhotos_AlbumId");

        migrationBuilder.AddColumn<int>(
            name: "PublisherId",
            table: "Playlists",
            type: "integer",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<int>(
            name: "Order",
            table: "AlbumSongs",
            type: "integer",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<int>(
            name: "PublisherId",
            table: "Albums",
            type: "integer",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddPrimaryKey(
            name: "PK_AlbumPhotos",
            table: "AlbumPhotos",
            column: "Id");

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
            name: "Payments",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Amount = table.Column<int>(type: "integer", nullable: false),
                PaymentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                PaymentMethod = table.Column<string>(type: "text", nullable: false),
                UserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Payments", x => x.Id);
                table.ForeignKey(
                    name: "FK_Payments_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "PlaylistPhotos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                PlaylistId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_PlaylistPhotos", x => x.Id);
                table.ForeignKey(
                    name: "FK_PlaylistPhotos_Playlists_PlaylistId",
                    column: x => x.PlaylistId,
                    principalTable: "Playlists",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "PlaylistSongs",
            columns: table => new
            {
                PlaylistId = table.Column<int>(type: "integer", nullable: false),
                SongId = table.Column<int>(type: "integer", nullable: false),
                Order = table.Column<int>(type: "integer", nullable: false)
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
            name: "SubscriptionPlans",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                PlanName = table.Column<string>(type: "text", nullable: false),
                Description = table.Column<string>(type: "text", nullable: false),
                Price = table.Column<decimal>(type: "numeric", nullable: false),
                UserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
                table.ForeignKey(
                    name: "FK_SubscriptionPlans_AspNetUsers_UserId",
                    column: x => x.UserId,
                    principalTable: "AspNetUsers",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "PaymentDetail",
            columns: table => new
            {
                PaymentId = table.Column<int>(type: "integer", nullable: false),
                SubscriptionPlanId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_PaymentDetail", x => new { x.PaymentId, x.SubscriptionPlanId });
                table.ForeignKey(
                    name: "FK_PaymentDetail_Payments_PaymentId",
                    column: x => x.PaymentId,
                    principalTable: "Payments",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
                table.ForeignKey(
                    name: "FK_PaymentDetail_SubscriptionPlans_SubscriptionPlanId",
                    column: x => x.SubscriptionPlanId,
                    principalTable: "SubscriptionPlans",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Playlists_PublisherId",
            table: "Playlists",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_Albums_PublisherId",
            table: "Albums",
            column: "PublisherId");

        migrationBuilder.CreateIndex(
            name: "IX_ArtistAlbums_AlbumId",
            table: "ArtistAlbums",
            column: "AlbumId");

        migrationBuilder.CreateIndex(
            name: "IX_PaymentDetail_SubscriptionPlanId",
            table: "PaymentDetail",
            column: "SubscriptionPlanId");

        migrationBuilder.CreateIndex(
            name: "IX_Payments_UserId",
            table: "Payments",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_PlaylistPhotos_PlaylistId",
            table: "PlaylistPhotos",
            column: "PlaylistId");

        migrationBuilder.CreateIndex(
            name: "IX_PlaylistSongs_SongId",
            table: "PlaylistSongs",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_SongGenres_GenreId",
            table: "SongGenres",
            column: "GenreId");

        migrationBuilder.CreateIndex(
            name: "IX_SubscriptionPlans_UserId",
            table: "SubscriptionPlans",
            column: "UserId");

        migrationBuilder.AddForeignKey(
            name: "FK_AlbumPhotos_Albums_AlbumId",
            table: "AlbumPhotos",
            column: "AlbumId",
            principalTable: "Albums",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_Albums_AspNetUsers_PublisherId",
            table: "Albums",
            column: "PublisherId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_Playlists_AspNetUsers_PublisherId",
            table: "Playlists",
            column: "PublisherId",
            principalTable: "AspNetUsers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_AlbumPhotos_Albums_AlbumId",
            table: "AlbumPhotos");

        migrationBuilder.DropForeignKey(
            name: "FK_Albums_AspNetUsers_PublisherId",
            table: "Albums");

        migrationBuilder.DropForeignKey(
            name: "FK_Playlists_AspNetUsers_PublisherId",
            table: "Playlists");

        migrationBuilder.DropTable(
            name: "ArtistAlbums");

        migrationBuilder.DropTable(
            name: "PaymentDetail");

        migrationBuilder.DropTable(
            name: "PlaylistPhotos");

        migrationBuilder.DropTable(
            name: "PlaylistSongs");

        migrationBuilder.DropTable(
            name: "SongGenres");

        migrationBuilder.DropTable(
            name: "Payments");

        migrationBuilder.DropTable(
            name: "SubscriptionPlans");

        migrationBuilder.DropIndex(
            name: "IX_Playlists_PublisherId",
            table: "Playlists");

        migrationBuilder.DropIndex(
            name: "IX_Albums_PublisherId",
            table: "Albums");

        migrationBuilder.DropPrimaryKey(
            name: "PK_AlbumPhotos",
            table: "AlbumPhotos");

        migrationBuilder.DropColumn(
            name: "PublisherId",
            table: "Playlists");

        migrationBuilder.DropColumn(
            name: "Order",
            table: "AlbumSongs");

        migrationBuilder.DropColumn(
            name: "PublisherId",
            table: "Albums");

        migrationBuilder.RenameTable(
            name: "AlbumPhotos",
            newName: "AlbumPhoto");

        migrationBuilder.RenameColumn(
            name: "TotalViews",
            table: "Songs",
            newName: "TotalView");

        migrationBuilder.RenameColumn(
            name: "TotalViews",
            table: "Playlists",
            newName: "TotalView");

        migrationBuilder.RenameColumn(
            name: "TotalSongs",
            table: "Playlists",
            newName: "TotalSong");

        migrationBuilder.RenameIndex(
            name: "IX_AlbumPhotos_AlbumId",
            table: "AlbumPhoto",
            newName: "IX_AlbumPhoto_AlbumId");

        migrationBuilder.AddColumn<string>(
            name: "AlbumImageUrl",
            table: "Playlists",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddPrimaryKey(
            name: "PK_AlbumPhoto",
            table: "AlbumPhoto",
            column: "Id");

        migrationBuilder.AddForeignKey(
            name: "FK_AlbumPhoto_Albums_AlbumId",
            table: "AlbumPhoto",
            column: "AlbumId",
            principalTable: "Albums",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}
