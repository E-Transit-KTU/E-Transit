// Controllers/VehiclesController.cs
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.DTOs;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehiclesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetVehicles()
        {
            var vehicles = await _context.Vehicles
                .Select(v => new VehicleDto
                {
                    Id = v.Id,
                    ValstybiniaiNum = v.ValstybiniaiNum,
                    Rida = v.Rida,
                    VietuSk = v.VietuSk,
                    KuroTipas = v.KuroTipas
                })
                .ToListAsync();

            return Ok(vehicles);
        }

        // GET: api/vehicles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Where(v => v.Id == id)
                .Select(v => new VehicleDto
                {
                    Id = v.Id,
                    ValstybiniaiNum = v.ValstybiniaiNum,
                    Rida = v.Rida,
                    VietuSk = v.VietuSk,
                    KuroTipas = v.KuroTipas
                })
                .FirstOrDefaultAsync();

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        // POST: api/vehicles
        [HttpPost]
        public async Task<ActionResult<VehicleDto>> PostVehicle(CreateVehicleDto createVehicleDto)
        {
            var vehicle = new Vehicle
            {
                ValstybiniaiNum = createVehicleDto.ValstybiniaiNum,
                Rida = createVehicleDto.Rida,
                VietuSk = createVehicleDto.VietuSk,
                KuroTipas = createVehicleDto.KuroTipas
            };

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            var vehicleDto = new VehicleDto
            {
                Id = vehicle.Id,
                ValstybiniaiNum = vehicle.ValstybiniaiNum,
                Rida = vehicle.Rida,
                VietuSk = vehicle.VietuSk,
                KuroTipas = vehicle.KuroTipas
            };

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicleDto);
        }

        // PUT: api/vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(int id, UpdateVehicleDto updateVehicleDto)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            vehicle.ValstybiniaiNum = updateVehicleDto.ValstybiniaiNum;
            vehicle.Rida = updateVehicleDto.Rida;
            vehicle.VietuSk = updateVehicleDto.VietuSk;
            vehicle.KuroTipas = updateVehicleDto.KuroTipas;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }
    }
}