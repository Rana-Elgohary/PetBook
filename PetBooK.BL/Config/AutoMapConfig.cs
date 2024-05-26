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

            CreateMap<BreedGetDTO, Breed>();
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<UserAddDTO, User>();
            CreateMap<DoctorDTO, Doctor>();
            CreateMap<Doctor, DoctorDTO>();
            CreateMap<Doctor, DoctorAddDTO>();
            CreateMap<DoctorAddDTO,Doctor>();
            CreateMap<Breed, BreedGetDTO>();
            CreateMap<BreedGetDTO,Breed >();
            CreateMap<BreedAddDTO, Breed>();
            CreateMap<Pet_Breed, PetBreedAddDTO>();
            CreateMap<PetBreedAddDTO , Pet_Breed >();
            CreateMap<Pet, PetGetDTO>();
            CreateMap<PetGetDTO, Pet>();
            CreateMap<Pet, PetAddDTO>();
            CreateMap<PetAddDTO, Pet>();



            CreateMap<Reservation, ReservationGetDTO>()
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name))
            .ForMember(dest => dest.PetName, opt => opt.MapFrom(src => src.Pet.Name)); ;
            
            CreateMap<ReservationPostDTO, Reservation> ();

            CreateMap<Breed, BreedWithPetDTO>()
             .ForMember(dest => dest.PetID, opt => opt.MapFrom(src => src.Pet_Breeds.Select(p => p.PetID).ToList()));

           
        }
    }
}
