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
            //Mapping Breed
            CreateMap<Breed, BreedGetDTO>();


            ///Mapping Reservations
            CreateMap<Reservation, ReservationGetDTO>()
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name))
            .ForMember(dest => dest.PetName, opt => opt.MapFrom(src => src.Pet.Name)); ;
            
            CreateMap<ReservationPostDTO, Reservation> ();


            //Mapping Role
            CreateMap<Role, RoleDTO>();  //src,dest
            CreateMap<RoleDTO, Role>();
            CreateMap<RolePostDTO, Role>();



            //Mapping Vaccine
            CreateMap<Vaccine, VaccineDTO>();
            CreateMap<VaccineDTO, Vaccine>();
            CreateMap<VaccinePostDTO, Vaccine>();
        }
    }
}
