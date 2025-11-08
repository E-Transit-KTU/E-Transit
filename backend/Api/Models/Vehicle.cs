// Models/Vehicle.cs
using Api.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    [Table("vehicles")] // Explicit table name for PostgreSQL
    public class Vehicle
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        [Column("valstybiniai_num")]
        public string ValstybiniaiNum { get; set; } = string.Empty;

        [Required]
        [Column("rida")]
        public int Rida { get; set; }

        [Required]
        [Column("vietu_sk")]
        public int VietuSk { get; set; }

        [Required]
        [Column("kuro_tipas")]
        public KuroTipas KuroTipas { get; set; }
    }
}