using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    [Table("nuolaida")]
    public class Nuolaida
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        [Column("pavadinimas")]
        public string Pavadinimas { get; set; } = string.Empty;

        // procentais, pvz. 50 = 50%
        [Required]
        [Column("procentas")]
        public int Procentas { get; set; }
    }
}
