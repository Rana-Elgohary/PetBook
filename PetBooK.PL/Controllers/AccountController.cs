using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PetBooK.BL.DTO;
using PetBooK.BL.UOW;
using PetBooK.DAL.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        UnitOfWork unitofwork;
        IMapper mapper;


        public AccountController(UnitOfWork unitofwork, IMapper mapper)
        {
            this.unitofwork = unitofwork;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult login(string email, string password)
        {
            var user = unitofwork.userRepository.FirstOrDefault(s => s.Email == email && s.Password == password);
            if (user != null)
            {

                #region claims   
                List<Claim> userdata = new List<Claim>();
                userdata.Add(new Claim("UserName", user.UserName));
                userdata.Add(new Claim("Name", user.Name));
                userdata.Add(new Claim("id", user.UserID.ToString()));
                userdata.Add(new Claim("RoleId", user.RoleID.ToString()));
                #endregion

                #region secret key
                string key = "welcome to my secret key PetBook Alex";
                var secertkey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
                var signingcer = new SigningCredentials(secertkey, SecurityAlgorithms.HmacSha256);
                #endregion

                #region generate token 
                //header =>hashing algo
                //payload=>claims,expiredate
                //signture => secertkey
                var token = new JwtSecurityToken(
                    claims: userdata,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: signingcer
                    );

                //token object => encoded string
                //var tokenobjhand = new JwtSecurityTokenHandler();
                //var finaltoken= tokenobjhand.WriteToken(token);
                var tokenstring = new JwtSecurityTokenHandler().WriteToken(token);
                #endregion

                return Ok(tokenstring);

            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("Register")]

        public ActionResult Register(RegisterDTO userDto)
        {
            if (ModelState.IsValid)
            {
                User user = mapper.Map<User>(userDto);
                unitofwork.userRepository.add(user);
                unitofwork.SaveChanges();
                return Created();
            }
            else
                return BadRequest(ModelState);
        }

    }
}


