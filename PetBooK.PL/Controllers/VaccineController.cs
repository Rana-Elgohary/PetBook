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
    public class VaccineController : ControllerBase
    {
        UnitOfWork unit;
        IMapper mapper;
        public VaccineController(UnitOfWork _unit, IMapper _mapper)
        {
            unit = _unit;
            mapper = _mapper;
        }

        [HttpGet]
        public IActionResult GetAllVaccines()
        {
            try
            {
                List<Vaccine> Vaccines = unit.vaccineRepository.selectall();
                List<VaccineDTO> VaccinesDTO = mapper.Map<List<VaccineDTO>>(Vaccines);
                if(VaccinesDTO.Count > 0)
                {
                    return Ok(VaccinesDTO);
                }
                else
                {
                    return NotFound("There's no vaccines");
                }

            }
            catch
            {
                return StatusCode(500, "An error occurred while processing your request");

            }
        }


        [HttpGet("{id}")]
        public IActionResult GetVaccineByID(int id)
        {
            try
            {
                Vaccine vaccine = unit.vaccineRepository.selectbyid(id);
                if(vaccine == null)
                {
                    return NotFound("This Vaccine is not found");
                }
                VaccineDTO vaccineDTO = mapper.Map<VaccineDTO>(vaccine);
                return Ok(vaccineDTO);
            }
            catch
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }



        [HttpPost]
        public IActionResult AddVaccine(VaccinePostDTO NewVaccineDTO)
        {
            try
            {
                if (NewVaccineDTO == null)
                {
                    return BadRequest();
                }
                Vaccine vaccine = mapper.Map<Vaccine>(NewVaccineDTO);
                unit.vaccineRepository.add(vaccine);
                unit.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }


        [HttpPut]
        public IActionResult EditVaccine(VaccineDTO vaccineDTO)
        {
            try
            {
                if (vaccineDTO == null)
                {
                    return BadRequest("Please enter the required data");
                }
                Vaccine vaccine = mapper.Map<Vaccine>(vaccineDTO);
                unit.vaccineRepository.update(vaccine);
                unit.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}
