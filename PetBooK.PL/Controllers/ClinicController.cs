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
    public class ClinicController : ControllerBase
    {

        UnitOfWork unitOfWork;
        IMapper mapper;
        public ClinicController(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        //------------------------------------------Get----------------------------------------
        //------------------GetAll-----------
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Clinic> clinics = unitOfWork.clinicRepository.selectall();
            if (clinics == null)
            {
                return NotFound();
            }

            List<ClinicccDTO> clinicDTO = mapper.Map<List<ClinicccDTO>>(clinics);   //mayaaaaa   

            return Ok(clinicDTO);
        }
        //--------------------------GetById-------------------------
        [HttpGet("id")]
        public IActionResult GetById(int id)
        {
            Clinic clinic = unitOfWork.clinicRepository.selectbyid(id);
            if (clinic == null)
            {
                return NotFound();
            }
            else
            {
                ClinicccDTO clinicDTO = mapper.Map<ClinicccDTO>(clinic);
                return Ok(clinicDTO);
            }
        }

        //-----------------------------GetByName-----------------------
        [HttpGet("Name")]
        public IActionResult GetByName(string name)
        {
            List<Clinic> clinics = unitOfWork.clinicRepository.FindBy(l => l.Name == name);
            if (clinics == null)
            {
                return NotFound();
            }
            else
            {
                List<ClinicccDTO> clinicDTO = mapper.Map<List<ClinicccDTO>>(clinics);   //mayaaaaa   

                return Ok(clinicDTO);
            }
        }

        //-----------------------------GetByRate-----------------------
        [HttpGet("Rate")]
        public IActionResult GetByRate(int rate)
        {
            List<Clinic> clinics = unitOfWork.clinicRepository.FindBy(l => l.Rate == rate);
            if (clinics == null)
            {
                return NotFound();
            }
            else
            {
                List<ClinicccDTO> clinicDTO = mapper.Map<List<ClinicccDTO>>(clinics);  

                return Ok(clinicDTO);
            }
        }


        //-------------------------------ADD------------------------------
        [HttpPost]
        public ActionResult AddClinic(ClinicAddDTO clinicDTO)
        {
            if (clinicDTO == null)
                return BadRequest();
            else
            {
                Clinic clinic = mapper.Map<Clinic>(clinicDTO);
                unitOfWork.clinicRepository.add(clinic);
                unitOfWork.SaveChanges();
                return Ok(clinicDTO);
            }
        }

        //-------------------------Update------------------------------
        [HttpPut]
        public ActionResult UpdateClinic(ClinicccDTO clinicDTO)
        {
            if (clinicDTO == null)
                return BadRequest();
            else
            {

                Clinic clinic = mapper.Map<Clinic>(clinicDTO);
                unitOfWork.clinicRepository.update(clinic);
                unitOfWork.SaveChanges();
                return Ok(clinicDTO);
            }
        }

        //--------------------------------Delete----------------------
        [HttpDelete]
        public IActionResult DeleteClinic(int id)
        {
            if (id == null)
                return NotFound();
            Clinic clinic = unitOfWork.clinicRepository.selectbyid(id);
            if (clinic == null)
                return NotFound();
            unitOfWork.clinicRepository.delete(id);
            unitOfWork.SaveChanges();
            return Ok("clinic has Successfully been deleted");
        }

    }
}
