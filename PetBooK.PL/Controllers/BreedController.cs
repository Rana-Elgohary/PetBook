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
    public class BreedController : ControllerBase
    {
        UnitOfWork unitOfWork;
        IMapper mapper;


        public BreedController(UnitOfWork unitOfWork , IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Breed> breeds = unitOfWork.breedRepository.selectall();
            if (breeds == null)
            {
                return NotFound();
            }

            List<BreedGetDTO> BreedDTO = mapper.Map<List<BreedGetDTO>>(breeds);   //mayaaaaa   //foreach (PackageUser PackageUser in packageUsers)

            return Ok(BreedDTO);
        }

        [HttpGet("id")]
        public IActionResult GetById(int id)
        {
            var breed =unitOfWork.breedRepository.selectbyid(id);
            return Ok(breed);
        }




    }
}
