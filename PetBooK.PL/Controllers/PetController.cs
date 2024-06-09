using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetBooK.BL.DTO;
using PetBooK.BL.UOW;
using PetBooK.DAL.Models;
using PetBooK.DAL.Services;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        UnitOfWork unitOfWork;
        IMapper mapper;
        IFileService fileService;

        public PetController(UnitOfWork unitOfWork, IMapper mapper , IFileService fileService)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.fileService = fileService;
        }

        //------------------------------------------------------------------------------------------------------

        [HttpGet]
        public IActionResult GetAllPets()
        {
            List<Pet> pets = unitOfWork.petRepository.selectall();
            if (pets == null) { return BadRequest(); }

            List<PetGetDTO> PetDTO = mapper.Map<List<PetGetDTO>>(pets);
            return Ok(PetDTO);
        }

        //---------------------------------------------------------------------------------------------------
        //get all pets when are ready for breeding

        [HttpGet("RequestPet")]
        public IActionResult GetAllTypesWithoutFilterWhenRequestIsTrue()
        {    
            List<Pet> pets = unitOfWork.petRepository.FindBy(p => p.ReadyForBreeding == true );
            if (pets == null) { return BadRequest(); }


            List<PetGetDTO> PetDTO = mapper.Map<List<PetGetDTO>>(pets);
            return Ok(PetDTO);
        }
        //---------------------------------search for both dogs orrr cats which are ready-----------------------------
        [HttpGet("SearchPetsReadyForBreeding")]
        public IActionResult GetAllPetsReadyForBreeding()
        {
            var pets = unitOfWork.petRepository.FindBy(p => p.ReadyForBreeding && (p.Type == "Dog" || p.Type == "Cat"));
            if (!pets.Any()) { return NotFound("No pets ready for breeding found."); }

            var petDTOs = mapper.Map<List<PetGetDTO>>(pets);
            return Ok(petDTOs);
        }
        //-----------------------------------search for dogs only which are readyfor breading-------------
        [HttpGet("SearchDogsReadyForBreeding")]
        public IActionResult GetAllDogsReadyForBreeding()
        {
            var pets = unitOfWork.petRepository.FindBy(p => p.ReadyForBreeding && p.Type == "Dog");
            if (!pets.Any()) { return NotFound("No pets ready for breeding found."); }

            var petDTOs = mapper.Map<List<PetGetDTO>>(pets);
            return Ok(petDTOs);
        }
        //-----------------------------------

        [HttpGet("SearchCatsReadyForBreeding")]
        public IActionResult GetAllCatsReadyForBreeding()
        {
            var pets = unitOfWork.petRepository.FindBy(p => p.ReadyForBreeding && p.Type == "Cat");
            if (!pets.Any()) { return NotFound("No pets ready for breeding found."); }

            var petDTOs = mapper.Map<List<PetGetDTO>>(pets);
            return Ok(petDTOs);
        }
        //-----------------------------------
        [HttpPost] //Edit By Amira
        public async Task<IActionResult> PostPet(PetAddDTO NewPet)
        {
            string[] allowedFileExtentions = [".jpg", ".jpeg", ".png", ".webp"];

            string createdImageName = await fileService.SaveFileAsync(NewPet.Photo, allowedFileExtentions);
            if (NewPet == null)
            {
                return BadRequest();
            }

            else
            {
                Pet pet = new Pet
                {
                    Name = NewPet.Name,
                    Photo = createdImageName,
                    AgeInMonth = NewPet.AgeInMonth,
                    Sex = NewPet.Sex,
                    IDNoteBookImage = NewPet.IDNoteBookImage,
                    ReadyForBreeding = NewPet.ReadyForBreeding,
                    UserID = NewPet.UserID,
                    Type = NewPet.Type,
                    Other = NewPet.Other,
                };

                unitOfWork.petRepository.add(pet);
                unitOfWork.SaveChanges();
                return Ok(pet);
            }
        }

        //------------------------------------------------------------------------------------------------

        [HttpGet("id")]
        public IActionResult GetId(int id)
        {
            Pet pet = unitOfWork.petRepository.selectbyid(id);
            if (pet == null) { return BadRequest(); }
            PetGetDTO petDTO = mapper.Map<PetGetDTO>(pet);
            return Ok(petDTO);
        }

        //-----------------------------------------------------------------------------------------------------

        [HttpPut] //Edit By Amira

        public async Task<IActionResult> Edit(int id,[FromForm]PetUpdateDTO NewPet)
        {
            if (id != NewPet.PetID)
            {
                return BadRequest();
            }

            var existingPet = unitOfWork.petRepository.selectbyid(id);
            if (existingPet == null)
            {
                return NotFound();
            }

            else
            {
                string oldImage = existingPet.Photo;

                if (NewPet.Photo != null)
                {

                    string[] allowedFileExtentions = [".jpg", ".jpeg", ".png", ".webp"];
                    string createdImageName = await fileService.SaveFileAsync(NewPet.Photo, allowedFileExtentions);


                    existingPet.Name = NewPet.Name;
                    existingPet.Photo = createdImageName;
                    existingPet.AgeInMonth = NewPet.AgeInMonth;
                    existingPet.Sex = NewPet.Sex;
                    existingPet.IDNoteBookImage = NewPet.IDNoteBookImage;
                    existingPet.ReadyForBreeding = NewPet.ReadyForBreeding;
                    existingPet.UserID = NewPet.UserID;
                    existingPet.Type = NewPet.Type;
                    existingPet.Other = NewPet.Other;
                    unitOfWork.petRepository.update(existingPet);
                    unitOfWork.SaveChanges();
                }
                if (NewPet.Photo != null)
                    fileService.DeleteFile(oldImage);
                return Ok(NewPet);
            }

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
            fileService.DeleteFile(pet.Photo); //Edit By Amira
            unitOfWork.SaveChanges();
            return Ok();
        }

        [HttpGet("user/{userId}")]
        public ActionResult GetPetsByUserId(int userId)
        {
            var pets = unitOfWork.petRepository.GetEntitiesByUserId(userId, "UserID");
            if (pets == null || !pets.Any())
            {
                return NotFound();
            }
            List<PetGetDTO> petDTO = mapper.Map<List<PetGetDTO>>(pets);
            return Ok(petDTO);
        }

        [HttpGet("{petId}/breed")]
        public ActionResult<string> GetBreedTypeByPetId(int petId)
        {
            var breedType = unitOfWork.petRepository.GetBreedTypeByPetId(petId);
            if (breedType == null)
            {
                return NotFound();
            }
            return Ok(breedType);
        }


        //[HttpPost("{petId}/pair")]
        //public IActionResult PairPets(int petId, [FromBody] int userId)
        //{
        //    var success = unitOfWork.petRepository.PairPets(petId, userId);
        //    if (success)
        //    {
        //        return Ok(true);
        //    }


        //        // Handle any other failure scenarios
        //        return BadRequest("An error occurred while processing the request.");

        //}
        [HttpPost("{petId}/pair")]
        public IActionResult PairPets(int petId, [FromBody] int userId)
        {
            var success = unitOfWork.petRepository.PairPets(petId, userId);
            if (success)
            {
                return Ok(true);
            }
            var currentPet = unitOfWork.petRepository.selectbyid(petId);
            if (currentPet != null && !currentPet.ReadyForBreeding)
            {
                return Ok(false);
            }

            return BadRequest(false);
        }




    }
}
