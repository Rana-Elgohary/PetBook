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
    public class DoctorController : ControllerBase
    {
            UnitOfWork unitOfWork;
            IMapper mapper;
            public DoctorController(UnitOfWork unitOfWork, IMapper mapper)
            {
                this.unitOfWork = unitOfWork;
                this.mapper = mapper;
            }
            //------------------------------------------Get----------------------------------------
            //------------------GetAll-----------
            [HttpGet]
            public IActionResult GetAll()
            {
                List<Doctor> Doctors = unitOfWork.doctorRepository.selectall();
                if (Doctors == null)
                {
                    return NotFound();
                }

                List<DoctorDTO> DoctorDTO = mapper.Map<List<DoctorDTO>>(Doctors);    

                return Ok(DoctorDTO);
            }
            //--------------------------GetById-------------------------
            [HttpGet("id")]
            public IActionResult GetById(int id)
            {
                Doctor doctor = unitOfWork.doctorRepository.selectbyid(id);
                if (doctor == null)
                {
                    return NotFound();
                }
                else
                {
                    DoctorDTO DoctorDTO = mapper.Map<DoctorDTO>(doctor);
                    return Ok(DoctorDTO);
                }
            }

            //-----------------------------GetByLoc-----------------------
            [HttpGet("Degree")]
            public IActionResult GetByLoc(string Degree)
            {
                List<Doctor> doctors = unitOfWork.doctorRepository.FindBy(d => d.Degree == Degree);
                if (doctors == null)
                {
                    return NotFound();
                }
                else
                {
                    List<DoctorDTO> DoctorDTO = mapper.Map<List<DoctorDTO>>(doctors);   //mayaaaaa   

                    return Ok(DoctorDTO);
                }
            }



        //-------------------------------ADD------------------------------
        [HttpPost]
        public ActionResult AddDoctor(DoctorAddDTO doctoraddDTO)
        {
            if (doctoraddDTO == null)
                return BadRequest();
            else
            {
                Doctor doctor = mapper.Map<Doctor>(doctoraddDTO);
                unitOfWork.doctorRepository.add(doctor);
                unitOfWork.SaveChanges();
                return Ok(doctoraddDTO);
            }
        }


        //-------------------------Update------------------------------
        [HttpPut]
            public ActionResult UpdateDoctor(DoctorAddDTO doctorDTO)
            {
                if (doctorDTO == null)
                    return BadRequest();
                else
                {

                    Doctor doctor = mapper.Map<Doctor>(doctorDTO);
                    unitOfWork.doctorRepository.update(doctor);
                    unitOfWork.SaveChanges();
                    return Ok(doctorDTO);
                }
            }

        //--------------------------------Delete----------------------
        [HttpDelete("id")]
        public IActionResult DeleteDoctorr(int id)
        {
            List<Clinic_Doctor> doctors = unitOfWork.clinic_DoctorRepository.FindBy(p => p.DoctorID == id);
            foreach (var item in doctors)
            {
                unitOfWork.clinic_DoctorRepository.deleteEntity(item);

            }
            unitOfWork.SaveChanges();

            Doctor doctor = unitOfWork.doctorRepository.FirstOrDefault(p => p.DoctorID == id);
            unitOfWork.doctorRepository.deleteEntity(doctor);

            unitOfWork.SaveChanges();
            return Ok("Doctor Has been deleted Successfully deleted");

        }
        }

    }

