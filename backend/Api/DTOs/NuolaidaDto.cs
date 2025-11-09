namespace Api.DTOs
{
    public class NuolaidaDto
    {
        public int Id { get; set; }
        public string Pavadinimas { get; set; } = string.Empty;
        public int Procentas { get; set; }
    }

    public class CreateNuolaidaDto
    {
        public string Pavadinimas { get; set; } = string.Empty;
        public int Procentas { get; set; }
    }

    public class UpdateNuolaidaDto
    {
        public string Pavadinimas { get; set; } = string.Empty;
        public int Procentas { get; set; }
    }
}
