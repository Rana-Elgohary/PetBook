using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetBooK.BL.UOW;
using PetBooK.BL.DTO;
using PetBooK.DAL.Models;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecretaryController : ControllerBase
    {
        UnitOfWork unit;
        public SecretaryController(UnitOfWork unit)
        {
            this.unit = unit;
        }
        [HttpGet]
        public ActionResult GetAll()
        {
            try
            {
                var secretaries = unit.secretaryRepository.SelectAllWithIncludes(s => s.SecretaryNavigation, s => s.Clinic);

                var secrdto = secretaries.Select(s => new SecretaryDTO
                {
                    SecretaryID = s.SecretaryID,
                    Name = s.SecretaryNavigation?.Name,
                    Age = s.SecretaryNavigation?.Age,
                    Phone = s.SecretaryNavigation?.Phone,
                    Location = s.SecretaryNavigation?.Location,
                    Salary = s.Salary,
                    HiringDate = s.HiringDate,
                    ClinicID = s.ClinicID,
                    ClinicName = s.Clinic?.Name,
                }).ToList();

                return Ok(secrdto);
            }
            catch (Exception ex)
            {
                

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            try
            {
                var secretary = unit.secretaryRepository.SelectByIdWithIncludes(id, s => s.SecretaryNavigation, s => s.Clinic);

                if (secretary == null)
                {
                    return NotFound();
                }

                var sc = new SecretaryDTO()
                {
                    SecretaryID = secretary.SecretaryID,
                    Name = secretary.SecretaryNavigation?.Name,
                    Age = secretary.SecretaryNavigation?.Age,
                    Phone = secretary.SecretaryNavigation?.Phone,
                    Location = secretary.SecretaryNavigation?.Location,
                    Salary = secretary.Salary,
                    HiringDate = secretary.HiringDate,
                    ClinicID = secretary.ClinicID,
                    ClinicName = secretary.Clinic?.Name,
                };

                return Ok(sc);
            }
            catch (Exception ex)
            {
                

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var secretary = unit.secretaryRepository.SelectByIdWithIncludes(id, s => s.SecretaryNavigation);
                if (secretary == null)
                {
                    return NotFound();
                }

                unit.secretaryRepository.delete(id);
                if (secretary.SecretaryNavigation != null)
                {
                    unit.userRepository.delete(secretary.SecretaryNavigation.UserID);
                }
                unit.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] SecretaryDTO secretaryDTO)
        {
            try
            {
                var secretary = unit.secretaryRepository.SelectByIdWithIncludes(id, s => s.SecretaryNavigation, s => s.Clinic);
                if (secretary == null)
                {
                    return NotFound();
                }

                secretary.SecretaryNavigation.Name = secretaryDTO.Name;
                secretary.SecretaryNavigation.Phone = secretaryDTO.Phone;
                secretary.SecretaryNavigation.Location = secretaryDTO.Location;
                secretary.Salary = secretaryDTO.Salary;

                unit.secretaryRepository.update(secretary);
                unit.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }




    }
}
