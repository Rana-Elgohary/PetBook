﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PetBooK.DAL.Models;

[Table("Doctor")]
public partial class Doctor
{
    [Key]
    public int DoctorID { get; set; }

    [Required]
    [StringLength(255)]
    [Unicode(false)]
    public string Degree { get; set; }

    public DateOnly HiringDate { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Salary { get; set; }

    [ForeignKey("DoctorID")]
    [InverseProperty("Doctor")]
    public virtual User DoctorNavigation { get; set; }

    //[ForeignKey("DoctorID")]
    //[InverseProperty("Doctors")]
    public virtual ICollection<Clinic_Doctor> Clinic_Doctors { get; set; } = new List<Clinic_Doctor>();
}