#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class ModifyPhotoTables : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropPrimaryKey(
            name: "PK_UserPhotos",
            table: "UserPhotos");

        migrationBuilder.DropIndex(
            name: "IX_UserPhotos_UserId",
            table: "UserPhotos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_SongPhotos",
            table: "SongPhotos");

        migrationBuilder.DropIndex(
            name: "IX_SongPhotos_SongId",
            table: "SongPhotos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_PlaylistPhotos",
            table: "PlaylistPhotos");

        migrationBuilder.DropIndex(
            name: "IX_PlaylistPhotos_PlaylistId",
            table: "PlaylistPhotos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_AlbumPhotos",
            table: "AlbumPhotos");

        migrationBuilder.DropIndex(
            name: "IX_AlbumPhotos_AlbumId",
            table: "AlbumPhotos");

        migrationBuilder.DropColumn(
            name: "PublicId",
            table: "UserPhotos");

        migrationBuilder.DropColumn(
            name: "Url",
            table: "UserPhotos");

        migrationBuilder.DropColumn(
            name: "PublicId",
            table: "SongPhotos");

        migrationBuilder.DropColumn(
            name: "Url",
            table: "SongPhotos");

        migrationBuilder.DropColumn(
            name: "PublicId",
            table: "PlaylistPhotos");

        migrationBuilder.DropColumn(
            name: "Url",
            table: "PlaylistPhotos");

        migrationBuilder.DropColumn(
            name: "PublicId",
            table: "AlbumPhotos");

        migrationBuilder.DropColumn(
            name: "Url",
            table: "AlbumPhotos");

        migrationBuilder.RenameColumn(
            name: "Id",
            table: "UserPhotos",
            newName: "PhotoId");

        migrationBuilder.RenameColumn(
            name: "Id",
            table: "SongPhotos",
            newName: "PhotoId");

        migrationBuilder.RenameColumn(
            name: "Id",
            table: "PlaylistPhotos",
            newName: "PhotoId");

        migrationBuilder.RenameColumn(
            name: "Id",
            table: "AlbumPhotos",
            newName: "PhotoId");

        migrationBuilder.AlterColumn<int>(
            name: "PhotoId",
            table: "UserPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AlterColumn<int>(
            name: "PhotoId",
            table: "SongPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AlterColumn<int>(
            name: "PhotoId",
            table: "PlaylistPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AlterColumn<int>(
            name: "PhotoId",
            table: "AlbumPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AddPrimaryKey(
            name: "PK_UserPhotos",
            table: "UserPhotos",
            columns: new[] { "UserId", "PhotoId" });

        migrationBuilder.AddPrimaryKey(
            name: "PK_SongPhotos",
            table: "SongPhotos",
            columns: new[] { "SongId", "PhotoId" });

        migrationBuilder.AddPrimaryKey(
            name: "PK_PlaylistPhotos",
            table: "PlaylistPhotos",
            columns: new[] { "PlaylistId", "PhotoId" });

        migrationBuilder.AddPrimaryKey(
            name: "PK_AlbumPhotos",
            table: "AlbumPhotos",
            columns: new[] { "AlbumId", "PhotoId" });

        migrationBuilder.CreateTable(
            name: "Photos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Photos", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_UserPhotos_PhotoId",
            table: "UserPhotos",
            column: "PhotoId");

        migrationBuilder.CreateIndex(
            name: "IX_SongPhotos_PhotoId",
            table: "SongPhotos",
            column: "PhotoId");

        migrationBuilder.CreateIndex(
            name: "IX_PlaylistPhotos_PhotoId",
            table: "PlaylistPhotos",
            column: "PhotoId");

        migrationBuilder.CreateIndex(
            name: "IX_AlbumPhotos_PhotoId",
            table: "AlbumPhotos",
            column: "PhotoId");

        migrationBuilder.AddForeignKey(
            name: "FK_AlbumPhotos_Photos_PhotoId",
            table: "AlbumPhotos",
            column: "PhotoId",
            principalTable: "Photos",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_PlaylistPhotos_Photos_PhotoId",
            table: "PlaylistPhotos",
            column: "PhotoId",
            principalTable: "Photos",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_SongPhotos_Photos_PhotoId",
            table: "SongPhotos",
            column: "PhotoId",
            principalTable: "Photos",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            name: "FK_UserPhotos_Photos_PhotoId",
            table: "UserPhotos",
            column: "PhotoId",
            principalTable: "Photos",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_AlbumPhotos_Photos_PhotoId",
            table: "AlbumPhotos");

        migrationBuilder.DropForeignKey(
            name: "FK_PlaylistPhotos_Photos_PhotoId",
            table: "PlaylistPhotos");

        migrationBuilder.DropForeignKey(
            name: "FK_SongPhotos_Photos_PhotoId",
            table: "SongPhotos");

        migrationBuilder.DropForeignKey(
            name: "FK_UserPhotos_Photos_PhotoId",
            table: "UserPhotos");

        migrationBuilder.DropTable(
            name: "Photos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_UserPhotos",
            table: "UserPhotos");

        migrationBuilder.DropIndex(
            name: "IX_UserPhotos_PhotoId",
            table: "UserPhotos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_SongPhotos",
            table: "SongPhotos");

        migrationBuilder.DropIndex(
            name: "IX_SongPhotos_PhotoId",
            table: "SongPhotos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_PlaylistPhotos",
            table: "PlaylistPhotos");

        migrationBuilder.DropIndex(
            name: "IX_PlaylistPhotos_PhotoId",
            table: "PlaylistPhotos");

        migrationBuilder.DropPrimaryKey(
            name: "PK_AlbumPhotos",
            table: "AlbumPhotos");

        migrationBuilder.DropIndex(
            name: "IX_AlbumPhotos_PhotoId",
            table: "AlbumPhotos");

        migrationBuilder.RenameColumn(
            name: "PhotoId",
            table: "UserPhotos",
            newName: "Id");

        migrationBuilder.RenameColumn(
            name: "PhotoId",
            table: "SongPhotos",
            newName: "Id");

        migrationBuilder.RenameColumn(
            name: "PhotoId",
            table: "PlaylistPhotos",
            newName: "Id");

        migrationBuilder.RenameColumn(
            name: "PhotoId",
            table: "AlbumPhotos",
            newName: "Id");

        migrationBuilder.AlterColumn<int>(
            name: "Id",
            table: "UserPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AddColumn<string>(
            name: "PublicId",
            table: "UserPhotos",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "Url",
            table: "UserPhotos",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AlterColumn<int>(
            name: "Id",
            table: "SongPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AddColumn<string>(
            name: "PublicId",
            table: "SongPhotos",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "Url",
            table: "SongPhotos",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AlterColumn<int>(
            name: "Id",
            table: "PlaylistPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AddColumn<string>(
            name: "PublicId",
            table: "PlaylistPhotos",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "Url",
            table: "PlaylistPhotos",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AlterColumn<int>(
            name: "Id",
            table: "AlbumPhotos",
            type: "integer",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "integer")
            .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

        migrationBuilder.AddColumn<string>(
            name: "PublicId",
            table: "AlbumPhotos",
            type: "text",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "Url",
            table: "AlbumPhotos",
            type: "text",
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddPrimaryKey(
            name: "PK_UserPhotos",
            table: "UserPhotos",
            column: "Id");

        migrationBuilder.AddPrimaryKey(
            name: "PK_SongPhotos",
            table: "SongPhotos",
            column: "Id");

        migrationBuilder.AddPrimaryKey(
            name: "PK_PlaylistPhotos",
            table: "PlaylistPhotos",
            column: "Id");

        migrationBuilder.AddPrimaryKey(
            name: "PK_AlbumPhotos",
            table: "AlbumPhotos",
            column: "Id");

        migrationBuilder.CreateIndex(
            name: "IX_UserPhotos_UserId",
            table: "UserPhotos",
            column: "UserId");

        migrationBuilder.CreateIndex(
            name: "IX_SongPhotos_SongId",
            table: "SongPhotos",
            column: "SongId");

        migrationBuilder.CreateIndex(
            name: "IX_PlaylistPhotos_PlaylistId",
            table: "PlaylistPhotos",
            column: "PlaylistId");

        migrationBuilder.CreateIndex(
            name: "IX_AlbumPhotos_AlbumId",
            table: "AlbumPhotos",
            column: "AlbumId");
    }
}
