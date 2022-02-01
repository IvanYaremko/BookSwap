﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AppUserBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Books",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Books_AppUserId",
                table: "Books",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_AspNetUsers_AppUserId",
                table: "Books",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_AspNetUsers_AppUserId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_AppUserId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Books");
        }
    }
}
