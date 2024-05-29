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
    public class UserController : ControllerBase
    {
        UnitOfWork unitOfWork;
        IMapper mapper;


        public UserController(UnitOfWork unitOfWork, IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        //------------------------------------------Get----------------------------------------
        //------------------GetAll-----------
        [HttpGet]
        public IActionResult GetAll()
        {
            List<User> Users = unitOfWork.userRepository.selectall();
            if (Users == null)
            {
                return NotFound();
            }

            List<UserDTO> UserDTO = mapper.Map<List<UserDTO>>(Users);   //mayaaaaa   

            return Ok(UserDTO);
        }
        //--------------------------GetById-------------------------
        [HttpGet("id")]
        public IActionResult GetById(int id)
        {
            User User = unitOfWork.userRepository.selectbyid(id);
            if (User == null)
            {
                return NotFound();
            }
            else
            {
                UserDTO userDTO = mapper.Map<UserDTO>(User);
                return Ok(userDTO);
            }
        }

        //-----------------------------GetByLoc-----------------------
        [HttpGet("Loc")]
        public IActionResult GetByLoc(string Loc)
        {
             List <User> users = unitOfWork.userRepository.FindBy(l => l.Location == Loc);
            if (users == null)
            {
                return NotFound();
            }
            else
            {
                List<UserDTO> UserDTO = mapper.Map<List<UserDTO>>(users);   //mayaaaaa   

                return Ok(UserDTO);
            }
        }



        //-------------------------------ADD------------------------------
        [HttpPost]
        public ActionResult AddUser(UserAddDTO useraddDTO)
        {
            if (useraddDTO == null)
                return BadRequest();
            else
            {
                User user = mapper.Map<User>(useraddDTO);
                unitOfWork.userRepository.add(user);
                unitOfWork.SaveChanges();

                return Ok(useraddDTO);
            }
        }

        //-------------------------Update------------------------------
        [HttpPut]
        public ActionResult UpdateUser(UserDTO userDTO)
        {
            if (userDTO == null)
                return BadRequest();
            else
            {

                User user = mapper.Map<User>(userDTO);
                unitOfWork.userRepository.update(user);
                unitOfWork.SaveChanges();
                return Ok(userDTO);
            }
        }

        //--------------------------------Delete----------------------
        [HttpDelete]
        public IActionResult DeleteUser(int id)
        {
            if (id == null)
               return NotFound();
            User user = unitOfWork.userRepository.selectbyid(id);
            if (user == null)
                return NotFound();
            unitOfWork.userRepository.delete(id);
            unitOfWork.SaveChanges();
            return Ok("User Is Successfully deleted");
        }


    }

}

