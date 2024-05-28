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




            ///Mapping Reservations
            CreateMap<Reservation, ReservationGetDTO>()
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name))
            .ForMember(dest => dest.PetName, opt => opt.MapFrom(src => src.Pet.Name));
            
            CreateMap<ReservationPostDTO, Reservation> ();


            //Mapping Role
            CreateMap<Role, RoleDTO>();  //src,dest
            CreateMap<RoleDTO, Role>();
            CreateMap<RolePostDTO, Role>();



            //Mapping Vaccine
            CreateMap<Vaccine, VaccineDTO>();
            CreateMap<VaccineDTO, Vaccine>();
            CreateMap<VaccinePostDTO, Vaccine>();
            CreateMap<Reservation, ReservationPostDTO>();

            //Mapping Clinic_Doctor
           
            CreateMap<Clinic_Doctor, ClinicDoctorDTO>()
            .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.doctor.DoctorNavigation.Name))
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.clinic.Name));

            CreateMap<ClinicDoctorDTO, Clinic_Doctor>();
            CreateMap < ClinicDoctorPostDTO,Clinic_Doctor> (); 




            CreateMap<Breed, BreedWithPetDTO>()
             .ForMember(dest => dest.PetID, opt => opt.MapFrom(src => src.Pet_Breeds.Select(p => p.PetID).ToList()));

           

            CreateMap<VaccinePetDTO, Vaccine_Pet>();
            CreateMap<Vaccine_Pet, VaccinePetDTO>();

            CreateMap<VaccineClinicDTO, Vaccine_Clinic>();
            CreateMap<Vaccine_Clinic, VaccineClinicDTO>();
        }
    }
}
