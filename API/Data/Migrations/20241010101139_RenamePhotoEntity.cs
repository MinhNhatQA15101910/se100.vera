#nullable disable

namespace API.Data.Migrations;

/// <inheritdoc />
public partial class RenamePhotoEntity : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Photos");

        migrationBuilder.CreateTable(
            name: "UserPhotos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                Url = table.Column<string>(type: "text", nullable: false),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                AppUserId = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserPhotos", x => x.Id);
                table.ForeignKey(
                    name: "FK_UserPhotos_Users_AppUserId",
                    column: x => x.AppUserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_UserPhotos_AppUserId",
            table: "UserPhotos",
            column: "AppUserId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "UserPhotos");

        migrationBuilder.CreateTable(
            name: "Photos",
            columns: table => new
            {
                Id = table.Column<int>(type: "integer", nullable: false)
                    .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                AppUserId = table.Column<int>(type: "integer", nullable: false),
                IsMain = table.Column<bool>(type: "boolean", nullable: false),
                PublicId = table.Column<string>(type: "text", nullable: true),
                Url = table.Column<string>(type: "text", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Photos", x => x.Id);
                table.ForeignKey(
                    name: "FK_Photos_Users_AppUserId",
                    column: x => x.AppUserId,
                    principalTable: "Users",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Photos_AppUserId",
            table: "Photos",
            column: "AppUserId");
    }
}
