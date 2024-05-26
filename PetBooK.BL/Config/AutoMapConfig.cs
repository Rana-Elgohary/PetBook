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
            CreateMap<BreedGetDTO,Breed >();
            CreateMap<BreedAddDTO, Breed>();
            CreateMap<Pet_Breed, PetBreedAddDTO>();
            CreateMap<PetBreedAddDTO , Pet_Breed >();
            CreateMap<Pet, PetGetDTO>();
            CreateMap<PetGetDTO, Pet>();
            CreateMap<Pet, PetAddDTO>();
            CreateMap<PetAddDTO, Pet>();



        }
    }
}
