import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../../Services/account-service.service';
import { ClinicReservationsService } from '../../Services/clinic-reservations.service';
import { ClinlicVccineReservationService } from '../../Services/clinlic-vccine-reservation.service';
import { UserPetInfoServiceService } from '../../Services/user-pet-info-service.service';
import { UserPetInfo } from '../../Models/user-pet-info';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaccineReservation } from '../../Models/vaccine-reservation';
import { ClinicReservation } from '../../Models/clinic-reservation';
import { ClinicService } from '../../Services/clinic.service';
import { ClinicPhones } from '../../Models/clinic-phones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-reservations',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './show-reservations.component.html',
  styleUrl: './show-reservations.component.css'
})
export class ShowReservationsComponent implements OnInit  {
  constructor(public AccountService: AccountServiceService,
              public clinicReservationService: ClinicReservationsService,
              public vaccineReservationService: ClinlicVccineReservationService,
              public userPetInfoService: UserPetInfoServiceService,
              public ClinicService: ClinicService
  ){}

  userID: number = Number(this.AccountService.r.id);
  userPetList: UserPetInfo[] = [];
  reservationClinic: ClinicReservation[]=[];
  reservationVacc: VaccineReservation[]=[];
  

  ngOnInit(): void {
   
    this.userPetInfoService.getPetByUserId(this.userID).subscribe({
      next: (UserPetInfoData) => {
        this.userPetList = UserPetInfoData;
        this.userPetList.forEach(element => {
          this.clinicReservationService.getClinicReservationByPetId(element.petID).subscribe({
            next:(clinicReservations)=>{
              this.reservationClinic = clinicReservations;
              this.reservationClinic.forEach(item=>{
                this.ClinicService.getClinicsPhoneNumbers(item.clinicID).subscribe({
                  next:(phonesList)=>{
                    console.log(phonesList);
                    this.reservationClinic.forEach(clinic=>
                      {
                        clinic.clinicPhones=phonesList;
                        
                      }
                    );
                  }
                })
              })
            }
          });
          this.vaccineReservationService.getVaccineReservationByPetId(element.petID).subscribe({
            next:(vaccineReservations)=>{
              this.reservationVacc=vaccineReservations;
              this.reservationVacc.forEach(item=>{
                this.ClinicService.getClinicsPhoneNumbers(item.clinicID).subscribe({
                  next:(phonesList)=>{
                    console.log(phonesList);
                    this.reservationVacc.forEach(clinic=>
                      {
                        clinic.Phones=phonesList;
                        
                      }
                    );
                  }
                })
              })
            }
          })
          
        });
      }
    }); 
  } 
  
  DeleteClinicReservation( PetID:number,clinicID:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this pet?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clinicReservationService.deleteClinicReservation(PetID,clinicID).subscribe({
          next: (d) => {
            console.log(d); 
          }
        });
        this.reservationClinic = this.reservationClinic.filter(reservation => !(reservation.petID === PetID && reservation.clinicID === clinicID));
        Swal.fire('Delete!', 'The pet has been deleted.', 'success'); 
      }
    });
  }

  DeleteVaccReservation(PetID:number,clinicID:number, VaccID: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this pet?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vaccineReservationService.DeleteVaccineDialogComponent(VaccID,clinicID,PetID).subscribe({
          next: (d) => {
            console.log(d); 
          }
        });
        this.reservationVacc = this.reservationVacc.filter(reservation => !(reservation.petID === PetID && reservation.clinicID === clinicID,reservation.vaccineID===VaccID));
        Swal.fire('Delete!', 'The pet has been deleted.', 'success'); 
      }
    });
  }
}
