// Data/ApplicationDbContext.cs
using Api.Enums;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using Api.Models;

namespace Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Vehicle> Vehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the enum to be stored as string in database
            modelBuilder.Entity<Vehicle>()
                .Property(v => v.KuroTipas)
                .HasConversion<string>()
                .HasMaxLength(20);

            // Optional: Seed some initial data
            modelBuilder.Entity<Vehicle>().HasData(
                new Vehicle { Id = 1, ValstybiniaiNum = "ABC123", Rida = 50000, VietuSk = 5, KuroTipas = KuroTipas.Benzinas },
                new Vehicle { Id = 2, ValstybiniaiNum = "DEF456", Rida = 80000, VietuSk = 7, KuroTipas = KuroTipas.Dyzelinas },
                new Vehicle { Id = 3, ValstybiniaiNum = "GHI789", Rida = 30000, VietuSk = 4, KuroTipas = KuroTipas.Elektra }
            );
        }
    }
}