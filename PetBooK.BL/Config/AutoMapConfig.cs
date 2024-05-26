using AutoMapper;
using PetBooK.BL.DTO;
using PetBooK.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetBooK.BL.Config
{
    public class AutoMapConfig : Profile
    {
        public AutoMapConfig() 
        {
            CreateMap<Breed, BreedGetDTO>();

            CreateMap<Reservation, ReservationGetDTO>()
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name))
            .ForMember(dest => dest.PetName, opt => opt.MapFrom(src => src.Pet.Name));
            
            CreateMap<ReservationPostDTO, Reservation> ();
            CreateMap<Reservation, ReservationPostDTO>();

        }
    }
}
