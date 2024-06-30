import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from '../../Services/clinic.service';
import { switchMap } from 'rxjs';
import { Clinic } from '../../Models/clinic';
import { Doctor } from '../../Models/doctor';
import { Reservation } from '../../Models/reservation';
import { ClinicInfo } from '../../Models/clinic-info';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../Services/account-service.service';
import { ClinicDoctor } from '../../Models/clinic-doctor';
import { ClinicDoctorService } from '../../Services/clinic-doctor.service';

@Component({
  selector: 'app-clinic',
  standalone: true,
  imports: [NgFor,CommonModule,FormsModule],
  templateUrl: './clinic.component.html',
  styleUrl: './clinic.component.css'
})
export class ClinicComponent {
  
  clinic: Clinic = new Clinic(0, "", 0, "");
  appointment: Reservation = new Reservation(1, 1, new Date(2020, 0, 6));
  clinicName: string = 'Default Clinic Name';
  clinicInfo: ClinicInfo | null = null;
  stars: number[] = [1, 2, 3, 4, 5];
  ClinicDoctors: ClinicDoctor[] = []

  constructor(private route: ActivatedRoute, private clinicService: ClinicService, public account:AccountServiceService, private clinicDoctor: ClinicDoctorService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const clinicId = +params['clinicId'];
        return this.clinicService.getClinicbyId(clinicId);
      })
    ).subscribe(clinic => {
      this.clinic = clinic;
      this.getDoctors(clinic.clinicID);
      this.searchClinicByName(clinic.name);
    });
  }

  getDoctors(clinicId: number): void {
    this.clinicDoctor.GetDoctorsByClinicID(clinicId).subscribe(
      data => {
        this.ClinicDoctors = data
        console.log(this.ClinicDoctors)
      }
    )
  }

  bookAppointment(): void {
    const reservation = new Reservation(
      Number(this.account.r.id),
      this.clinic.clinicID,
      this.appointment.date
    );
    
    console.log(this.appointment.date)
    console.log( this.clinic.clinicID)
    this.clinicService.bookAppointment(reservation).subscribe(response => {
      alert('Appointment booked successfully');
    }, error => {
      alert('Failed to book appointment');
    });
  }

  searchClinicByName(name: string): void {
    this.clinicService.getInfoClinicbyname(name).subscribe(data => {
      console.log('Clinic Info:', data);
      if (Array.isArray(data) && data.length > 0) {
        this.clinicInfo = data[0];
      } 
      else {
        this.clinicInfo = null;
      }
    }, error => {
      console.error('Error fetching clinic info:', error);
    });
  }
}