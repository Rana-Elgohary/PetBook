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
            CreateMap<ClinicccDTO, Clinic>();
            CreateMap<Clinic, ClinicccDTO>();
            CreateMap<Clinic, ClinicAddDTO>();
            CreateMap<ClinicAddDTO, Clinic>();



            CreateMap<Reservation, ReservationGetDTO>()
            .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name))
            .ForMember(dest => dest.PetName, opt => opt.MapFrom(src => src.Pet.Name));
            
            CreateMap<ReservationPostDTO, Reservation> ();
            CreateMap<Reservation, ReservationPostDTO>();

            CreateMap<Breed, BreedWithPetDTO>()
             .ForMember(dest => dest.PetID, opt => opt.MapFrom(src => src.Pet_Breeds.Select(p => p.PetID).ToList()));

           

            CreateMap<VaccinePetDTO, Vaccine_Pet>();
            CreateMap<Vaccine_Pet, VaccinePetDTO>();

            CreateMap<VaccineClinicDTO, Vaccine_Clinic>();
            CreateMap<Vaccine_Clinic, VaccineClinicDTO>();
            CreateMap<Secretary, SecretaryDTO>();
            CreateMap<Secretary, SecretaryDTO>()
             .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.SecretaryNavigation.Name))
             .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.SecretaryNavigation.Age))
             .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.SecretaryNavigation.Phone))
             .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.SecretaryNavigation.Location))
             .ForMember(dest => dest.ClinicID, opt => opt.MapFrom(src => src.Clinic.ClinicID))
             .ForMember(dest => dest.ClinicName, opt => opt.MapFrom(src => src.Clinic.Name));

            CreateMap<Clinic_Phone, ClinicPhoneDTO>();
            CreateMap<Clinic_Phone, ClinicPhoneUpdateDTO>();
            CreateMap<Clinic_Location, ClinicLocationDTO>();
            CreateMap<Clinic_Phone, ClinicPhoneUpdateDTO>()
           .ForMember(dest => dest.NewPhone, opt => opt.MapFrom(src => src.Phone));
            CreateMap<Clinic_Phone, ClinicPhoneDTO>()
           .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Phone));



        }
    }
}
