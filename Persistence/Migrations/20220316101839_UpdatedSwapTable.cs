using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class UpdatedSwapTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BookID",
                table: "Swaps",
                newName: "requesterBookID");

            migrationBuilder.AddColumn<string>(
                name: "ownerBookID",
                table: "Swaps",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ownerBookID",
                table: "Swaps");

            migrationBuilder.RenameColumn(
                name: "requesterBookID",
                table: "Swaps",
                newName: "BookID");
        }
    }
}
