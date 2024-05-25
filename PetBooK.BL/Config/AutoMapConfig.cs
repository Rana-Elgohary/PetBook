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
        }
    }
}
