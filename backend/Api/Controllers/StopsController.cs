using Api.Data;
using Api.DTOs;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StopsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<StopsController> _logger;

        public StopsController(ApplicationDbContext context, ILogger<StopsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/stoteles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoteleDto>>> GetStops()
        {
            try
            {
                var stops = await _context.Stoteles
                    .Select(s => new StoteleDto
                    {
                        Pavadinimas = s.Pavadinimas,
                        Savivaldybe = s.Savivaldybe,
                        KoordinatesX = s.KoordinatesX,
                        KoordinatesY = s.KoordinatesY,
                        Tipas = s.Tipas
                    })
                    .ToListAsync();

                return Ok(stops);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching stops");
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // GET: api/stoteles/{pavadinimas}
        [HttpGet("{pavadinimas}")]
        public async Task<ActionResult<StoteleDto>> GetStop(string pavadinimas)
        {
            try
            {
                var stop = await _context.Stoteles
                    .Where(s => s.Pavadinimas == pavadinimas)
                    .Select(s => new StoteleDto
                    {
                        Pavadinimas = s.Pavadinimas,
                        Savivaldybe = s.Savivaldybe,
                        KoordinatesX = s.KoordinatesX,
                        KoordinatesY = s.KoordinatesY,
                        Tipas = s.Tipas
                    })
                    .FirstOrDefaultAsync();

                if (stop == null)
                    return NotFound($"Stop '{pavadinimas}' not found");

                return Ok(stop);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching stop {Pavadinimas}", pavadinimas);
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // POST: api/stoteles
        [HttpPost]
        public async Task<ActionResult<StoteleDto>> CreateStop(CreateStoteleDto dto)
        {
            try
            {
                if (await _context.Stoteles.AnyAsync(s => s.Pavadinimas == dto.Pavadinimas))
                    return Conflict($"Stop '{dto.Pavadinimas}' already exists");

                var stop = new Stotele
                {
                    Pavadinimas = dto.Pavadinimas,
                    Savivaldybe = dto.Savivaldybe,
                    KoordinatesX = dto.KoordinatesX,
                    KoordinatesY = dto.KoordinatesY,
                    Tipas = dto.Tipas
                };

                _context.Stoteles.Add(stop);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetStop), new { pavadinimas = stop.Pavadinimas }, new StoteleDto
                {
                    Pavadinimas = stop.Pavadinimas,
                    Savivaldybe = stop.Savivaldybe,
                    KoordinatesX = stop.KoordinatesX,
                    KoordinatesY = stop.KoordinatesY,
                    Tipas = stop.Tipas
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating stop");
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // DELETE: api/stoteles/{pavadinimas}
        [HttpDelete("{pavadinimas}")]
        public async Task<IActionResult> DeleteStop(string pavadinimas)
        {
            try
            {
                var stop = await _context.Stoteles.FindAsync(pavadinimas);

                if (stop == null)
                    return NotFound($"Stop '{pavadinimas}' not found");

                _context.Stoteles.Remove(stop);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting stop {Pavadinimas}", pavadinimas);
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}