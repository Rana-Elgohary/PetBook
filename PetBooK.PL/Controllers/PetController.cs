using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetBooK.BL.DTO;
using PetBooK.BL.UOW;
using PetBooK.DAL.Models;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        UnitOfWork unitOfWork;
        IMapper mapper;


        public PetController(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        //------------------------------------------------------------------------------------------------------

        [HttpGet]
        public IActionResult GetAllPets() 
        {
            List<Pet> pets = unitOfWork.petRepository.selectall();
            if (pets == null) { return BadRequest(); }

            List<PetGetDTO> PetDTO=mapper.Map<List<PetGetDTO>>(pets);
            return Ok(PetDTO);
        }

        //---------------------------------------------------------------------------------------------------

        [HttpPost]
        public IActionResult PostPet(PetAddDTO NewPet)
        {
            if(NewPet == null) { return BadRequest(); };

            Pet pet = mapper.Map<Pet>(NewPet);

            unitOfWork.petRepository.add(pet);
            unitOfWork.SaveChanges();
            return Ok(pet);
        }

        //------------------------------------------------------------------------------------------------

        [HttpGet("id")]
        public IActionResult GetId(int id )
        {
           Pet pet= unitOfWork.petRepository.selectbyid(id);
            if(pet == null) { return BadRequest(); }
            PetGetDTO petDTO =mapper.Map<PetGetDTO>(pet);
            return Ok(petDTO);
        }

        //-----------------------------------------------------------------------------------------------------


        [HttpGet("userid")]
        public IActionResult GetAllPetByUserId(int id)
        {
            List<Pet> pet = unitOfWork.petRepository.FindBy(s=>s.UserID==id);
            if (pet == null) { return BadRequest(); }
            List<PetGetDTO> petDTO = mapper.Map<List<PetGetDTO>>(pet);
            return Ok(petDTO);
        }

        //-----------------------------------------------------------------------------------------------------

        [HttpPut]

        public IActionResult Edit(PetGetDTO NewPet)
        {
            if(NewPet == null) { return BadRequest(); }

            Pet pet= mapper.Map<Pet>(NewPet);
            unitOfWork.petRepository.update(pet);
            unitOfWork.SaveChanges();
            return Ok(NewPet);
        }

        //-----------------------------------------------------------------------------------------------------------
        [HttpGet("GetAllPetswhosReadyToDate")]
        public IActionResult GetAllPetswhosReadyToDate()
        {
            List<Pet> pet = unitOfWork.petRepository.FindBy(p => p.ReadyForBreeding == true);

            if (pet == null)
            {
                return NotFound();
            }

            List<PetGetDTO> petDTO = mapper.Map<List<PetGetDTO>>(pet);

            return Ok(petDTO);
        }


        //----------------------------------------------------------------------------------------------------

        [HttpDelete]

        public IActionResult DeleteById(int id)
        {
            //delete PetBreed

             List<Pet_Breed> petBreeds =unitOfWork.pet_BreedRepository.FindBy(p=>p.PetID == id);
            foreach (var item in petBreeds)
            {
                unitOfWork.pet_BreedRepository.deleteEntity(item);
            }
            unitOfWork.SaveChanges();

            //delete Vaccine-Pet

            List<Vaccine_Pet> vaccine_Pets = unitOfWork.vaccine_PetRepository.FindBy(p => p.PetID == id);
            foreach (var item in vaccine_Pets)
            {
                unitOfWork.vaccine_PetRepository.deleteEntity(item);
            }
            unitOfWork.SaveChanges();

            //delete Reservation For Vaccine

            List<Reservation_For_Vaccine> reservation_For_Vaccines = unitOfWork.reservation_For_VaccineRepository.FindBy(p => p.PetID == id);
            foreach (var item in reservation_For_Vaccines)
            {
                unitOfWork.reservation_For_VaccineRepository.deleteEntity(item);
            }
            unitOfWork.SaveChanges();

            //delete Reservation 

            List<Reservation> reservations = unitOfWork.reservationRepository.FindBy(p => p.PetID == id);
            foreach (var item in reservations)
            {
                unitOfWork.reservationRepository.deleteEntity(item);
            }
            unitOfWork.SaveChanges();

            //delete RequestForBreed

            List<Request_For_Breed> request_For_Breeds = unitOfWork.request_For_BreedRepository.FindBy(p => p.PetIDSender == id ||p.PetIDReceiver==id);
            foreach (var item in request_For_Breeds)
            {
                unitOfWork.request_For_BreedRepository.deleteEntity(item);
            }
            unitOfWork.SaveChanges();

            //delete pet 

            Pet pet =unitOfWork.petRepository.selectbyid(id);
            unitOfWork.petRepository.deleteEntity(pet);
            unitOfWork.SaveChanges();
            return Ok();
        }
    }
}

