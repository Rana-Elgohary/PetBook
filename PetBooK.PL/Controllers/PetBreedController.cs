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
    public class PetBreedController : ControllerBase
    {
        UnitOfWork unitOfWork;
        IMapper mapper;


        public PetBreedController(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]

        public IActionResult Get()
        {
            List<Pet_Breed> PetBreeds = unitOfWork.pet_BreedRepository.selectall();
            List<PetBreedAddDTO> PD = mapper.Map<List<PetBreedAddDTO>>(PetBreeds);   //mayaaaaa   //foreach (PackageUser PackageUser in packageUsers)

            return Ok(PD);
        }

        [HttpPost]
        public IActionResult AddNewPetBreed(PetBreedAddDTO PB)
        {
            if (PB == null)
            {
                return BadRequest();
            }
            Pet_Breed breed = mapper.Map<Pet_Breed>(PB);

            unitOfWork.pet_BreedRepository.add(breed);
            unitOfWork.SaveChanges();
            return Ok();

        }

        [HttpGet("id")]

        public IActionResult GetById(int PetID , int BreedID)
        {
           Pet_Breed PB =unitOfWork.pet_BreedRepository.FirstOrDefault(p=>p.BreedID == BreedID&& p.PetID== PetID);

            if(PB == null)
            {
               return BadRequest();
            }
            PetBreedAddDTO PBDTO = mapper.Map<PetBreedAddDTO>(PB);
            return Ok(PBDTO);
        }


        [HttpGet("BreedID")]

        public IActionResult GetByBreedId(int BreedID)
        {
            List<Pet_Breed> PB = unitOfWork.pet_BreedRepository.FindBy(p => p.BreedID == BreedID );

            if (PB == null)
            {
                return BadRequest();
            }

            List<PetBreedAddDTO> PBDTO = mapper.Map<List<PetBreedAddDTO>>(PB);
            return Ok(PBDTO);
        }

        [HttpGet("PetID")]

        public IActionResult GetByPetID(int PetID)
        {
            List<Pet_Breed> PB = unitOfWork.pet_BreedRepository.FindBy(p => p.PetID == PetID);

            if (PB == null)
            {
                return BadRequest();
            }

            List<PetBreedAddDTO> PBDTO = mapper.Map<List<PetBreedAddDTO>>(PB);
            return Ok(PBDTO);
        }

    }
}
