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
    public class VaccineClinicController : ControllerBase
    {
        UnitOfWork unit;
        IMapper mapper;

        public VaccineClinicController(UnitOfWork unit, IMapper mapper)
        {
            this.unit = unit;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult GetAllVaccineClinic()
        {
            try
            {
                List<Vaccine_Clinic> vaccineClinics = unit.vaccine_ClinicRepository.SelectAll();
                if (vaccineClinics == null || !vaccineClinics.Any())
                    return NotFound("No Data");

                List<VaccineClinicDTO> vaccineClinicDTOs = mapper.Map<List<VaccineClinicDTO>>(vaccineClinics);
                return Ok(vaccineClinicDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred while retrieving reservations.");
            }
        }

        [HttpGet("clinic/{ClinicId}")]
        public ActionResult GetVaccineClinictByClinicId(int ClinicId)
        {
            try
            {
                List<Vaccine_Clinic> vaccineClinics = unit.vaccine_ClinicRepository.FindBy(p => p.ClinicID == ClinicId);

                if (vaccineClinics == null || !vaccineClinics.Any())
                    return NotFound($"Vaccine Clinic with Clinic ID {ClinicId} not found.");

                List<VaccineClinicDTO> vaccineClinicDTOs = mapper.Map<List<VaccineClinicDTO>>(vaccineClinics);
                return Ok(vaccineClinicDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the reservation.");
            }
        }

        [HttpGet("vaccine/{VaccineId}")]
        public ActionResult GetVaccineClinicByVaccineId(int VaccineId)
        {
            try
            {
                List<Vaccine_Clinic> vaccineClinics = unit.vaccine_ClinicRepository.FindBy(p => p.VaccineID == VaccineId);

                if (vaccineClinics == null || !vaccineClinics.Any())
                    return NotFound($"Vaccine Clinic with Vaccine ID {VaccineId} not found.");

                List<VaccineClinicDTO> vaccineClinicDTOs = mapper.Map<List<VaccineClinicDTO>>(vaccineClinics);
                return Ok(vaccineClinicDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the reservation.");
            }
        }

        [HttpGet("{VaccineId:int}/{ClinicID:int}")]
        public ActionResult GetVaccineClinicByVaccineIdAndClinicId(int VaccineId, int ClinicID)
        {
            try
            {
                var vaccineClinic = unit.vaccine_ClinicRepository.FirstOrDefault(c => c.VaccineID == VaccineId && c.ClinicID == ClinicID);

                if (vaccineClinic == null)
                    return NotFound($"Vaccine Clinic with Vaccine ID {VaccineId} and Clinic ID {ClinicID} not found.");

                var vaccineClinicDTO = mapper.Map<VaccineClinicDTO>(vaccineClinic);
                return Ok(vaccineClinicDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving the reservation.");
            }
        }

        [HttpPost]
        public ActionResult AddVaccinePClinic(VaccineClinicDTO vaccineClinicDTO)
        {
            try
            {
                if (vaccineClinicDTO == null)
                    return BadRequest("Vaccine Clinic data is null");

                var existingVaccineClinic = unit.vaccine_ClinicRepository
                .FirstOrDefault(c => c.VaccineID == vaccineClinicDTO.VaccineID && c.ClinicID == vaccineClinicDTO.ClinicID);

                if (existingVaccineClinic != null)
                    return BadRequest("Vaccine Clinic already exists");

                Vaccine_Clinic vaccineClinic = mapper.Map<Vaccine_Clinic>(vaccineClinicDTO);
                unit.vaccine_ClinicRepository.add(vaccineClinic);
                unit.SaveChanges();
                return Ok("Successfully added");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPut]
        public ActionResult UpdateVaccineClinic(VaccineClinicDTO vaccineClinicDTO)
        {
            try
            {
                if (vaccineClinicDTO == null)
                    return BadRequest("Vaccine Clinic data is null");

                var existingVaccineClinic = unit.vaccine_ClinicRepository
                .FirstOrDefault(c => c.VaccineID == vaccineClinicDTO.VaccineID && c.ClinicID == vaccineClinicDTO.ClinicID);

                if (existingVaccineClinic == null)
                    return NotFound("Vaccine Clinic not found");

                mapper.Map(vaccineClinicDTO, existingVaccineClinic);

                unit.vaccine_ClinicRepository.update(existingVaccineClinic);
                unit.SaveChanges();
                return Ok("Successfully updated");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete]
        public ActionResult DeleteVaccineClinic(int VaccineId, int ClinicID)
        {
            try
            {
                if (ClinicID == null || VaccineId == null)
                    return BadRequest("Vaccine Clinic data is null");

                var vaccineClinic = unit.vaccine_ClinicRepository.FirstOrDefault(c => c.VaccineID == VaccineId && c.ClinicID == ClinicID);

                if (vaccineClinic == null)
                    return NotFound("No Data to delete");

                unit.vaccine_ClinicRepository.deleteEntity(vaccineClinic);
                unit.SaveChanges();
                return Ok("Successfully deleted");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}
