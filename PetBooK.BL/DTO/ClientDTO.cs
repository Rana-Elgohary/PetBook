﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetBooK.BL.DTO
{
    public class ClientDTO
    {
        public int ClientID { get; set; }
        public string BankAccount { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Location { get; set; }
        public int? Age { get; set; }
        public string Sex { get; set; }
        public string Photo { get; set; }
        public List<string> petsNames { get; set; }

    }
}
