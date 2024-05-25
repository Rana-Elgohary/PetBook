using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetBooK.BL.UOW;
using PetBooK.DAL.Models;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        UnitOfWork unit;

        public ReservationController(UnitOfWork unit)
        {
            this.unit = unit;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            List<Reservation> reservations = unit.reservationRepository.selectall();
            return Ok(reservations);
        }
    }
}
