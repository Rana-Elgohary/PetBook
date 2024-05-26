using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetBooK.BL.DTO;
using PetBooK.BL.UOW;
using PetBooK.DAL.Models;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        UnitOfWork unit;
        IMapper mapper;

        public ReservationController(UnitOfWork unit, IMapper mapper)
        {
            this.unit = unit;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            List<Reservation> reservations = unit.reservationRepository.SelectAll(r => r.Clinic, r => r.Pet);
            List<ReservationGetDTO> reservationDTOs = mapper.Map<List<ReservationGetDTO>>(reservations);

            return Ok(reservationDTOs);
        }

        [HttpPost]
        public ActionResult AddReservation(ReservationPostDTO reservationDTO)
        {
            Reservation reservation = mapper.Map<Reservation>(reservationDTO);
            unit.reservationRepository.add(reservation);
            unit.SaveChanges();
            return Ok();
        }
    }
}
