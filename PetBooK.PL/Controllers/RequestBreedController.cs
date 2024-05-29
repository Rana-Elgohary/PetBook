using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetBooK.BL.DTO;
using PetBooK.BL.UOW;
using PetBooK.DAL.Models;
using System.Linq.Expressions;
using System.Security.Cryptography;

namespace PetBooK.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestBreedController : ControllerBase
    {
        UnitOfWork unit;
        IMapper mapper;

        public RequestBreedController(UnitOfWork unit, IMapper mapper)
        {
            this.unit = unit;
            this.mapper = mapper;
        }

        //-------Get All Requests of breed--------
        [HttpGet]
        public IActionResult getAllRequestsOfBreed()
        {
            List<Request_For_Breed> allRequestsOfBreed = unit.request_For_BreedRepository.SelectAll(rb => rb.PetIDSenderNavigation, rb => rb.PetIDReceiverNavigation);


            if (allRequestsOfBreed.Count < 0)
            {
                return NotFound("No Data Found");
            }
            else
            {
                List<RequestBreedDTO> requestsOfBreedDTO = mapper.Map<List<RequestBreedDTO>>(allRequestsOfBreed);
                return Ok(requestsOfBreedDTO);
            }
        }

        //-------Get Request of breed by id--------
        [HttpGet("{Sid}/{Rid}")]
        public IActionResult getRequestBreedByID(int Sid,int Rid)
        {
            Request_For_Breed requestOfBreed = unit.request_For_BreedRepository.SelectByCompositeKeyInclude("PetIDSender", Sid, "PetIDReceiver", Rid, rb => rb.PetIDSenderNavigation, rb => rb.PetIDReceiverNavigation);
            if(requestOfBreed == null)
            {
                return NotFound("the data required is not found");
            }
            else
            {
                RequestBreedDTO requestOfBreedDTO = mapper.Map<RequestBreedDTO>(requestOfBreed);
                return Ok(requestOfBreedDTO);
            }
        }

        //-------Add Request of breed--------
        [HttpPost]
        public IActionResult addNewRequestBreed(RequestBreedAddDTO newRequestBreedDTO)
        {
            if (newRequestBreedDTO == null)
            {
                return BadRequest("The data you sent is null");
            }
            
            else
            {
                Request_For_Breed requestOfBreed = mapper.Map<Request_For_Breed>(newRequestBreedDTO);
                requestOfBreed.Pair = false;
                unit.request_For_BreedRepository.add(requestOfBreed);
                unit.SaveChanges();
                return Ok(requestOfBreed);
            }
        }

        //-------update Request of breed--------
        [HttpPut]
        public IActionResult updateRequestOfBreed(RequestBreedUpdateDTO updatedrequestBreedDTO)
        {
            try
            {
                if (updatedrequestBreedDTO == null)
                {
                    return BadRequest("Your Updated request data is null");
                }
                else
                {
                    Request_For_Breed updatedRequestBreed = mapper.Map<Request_For_Breed>(updatedrequestBreedDTO);
                    unit.request_For_BreedRepository.update(updatedRequestBreed);
                    unit.SaveChanges();
                    return Ok(updatedRequestBreed);
                }
            }
            catch
            {
                return StatusCode(500, "check if the ids of the request of breed are exist in pets table or any thing else");
            }
            
        }
        //-------delete Request of breed--------
        [HttpDelete("{SID}/{RID}")]
        public IActionResult deleteRequestBreed(int SID,int RID)
        {
            Request_For_Breed deletedRequestOfBreed = unit.request_For_BreedRepository.SelectByCompositeKeyInclude("PetIDSender", SID, "PetIDReceiver", RID, rb => rb.PetIDSenderNavigation, rb => rb.PetIDReceiverNavigation);
            if (deletedRequestOfBreed==null)
            {
                return NotFound("the request you want to delete is not found");
            }
            else
            {
                unit.request_For_BreedRepository.deleteEntity(deletedRequestOfBreed);
                unit.SaveChanges();
                return Ok("deleted");
            }
        }
    }
}
