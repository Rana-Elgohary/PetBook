﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PetBooK.DAL.Models;

[Table("Clinic")]
public partial class Clinic
{
    [Key]
    public int ClinicID { get; set; }

    [Required]
    [StringLength(255)]
    [Unicode(false)]
    public string Name { get; set; }

    public int? Rate { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string BankAccount { get; set; }

    //[Required]
    //[StringLength(255)]
    //[Unicode(false)]
    //public string Location { get; set; }

    [InverseProperty("Clinic")]
    public virtual ICollection<Clinic_Location> Clinic_Locations { get; set; } = new List<Clinic_Location>();

    [InverseProperty("Clinic")]
    public virtual ICollection<Clinic_Phone> Clinic_Phones { get; set; } = new List<Clinic_Phone>();

    [InverseProperty("Clinic")]
    public virtual ICollection<Reservation_For_Vaccine> Reservation_For_Vaccines { get; set; } = new List<Reservation_For_Vaccine>();

    [InverseProperty("Clinic")]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    [InverseProperty("Clinic")]
    public virtual Secretary Secretary { get; set; }

    [InverseProperty("Clinic")]
    public virtual ICollection<Vaccine_Clinic> Vaccine_Clinics { get; set; } = new List<Vaccine_Clinic>();

    //[ForeignKey("ClinicID")]
    [InverseProperty("Clinic")]
    public virtual ICollection<Clinic_Doctor> Clinic_Doctors { get; set; } = new List<Clinic_Doctor>();
}