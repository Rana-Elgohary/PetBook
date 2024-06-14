import { Component, OnInit } from '@angular/core';
import { VaccineClinicsService } from '../../Services/vaccine-clinics.service';
import { VaccineClinic } from '../../Models/vaccine-clinic';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinlicLocationService } from '../../Services/clinlic-location.service';
import { VaccineClinicLocation } from '../../Models/vaccine-clinic-location';
import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-vaccine-clicnic',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './search-vaccine-clicnic.component.html',
  styleUrls: ['./search-vaccine-clicnic.component.css']
})
export class SearchVaccineClicnicComponent implements OnInit {
  location:string="abu qier";
  VaccineId :number |null=null;
  vaccineClinic: VaccineClinic[] = [];
  vaccineClinicLocation: VaccineClinicLocation[] = [];

  constructor(
    private route: ActivatedRoute,
    private vaccineClinicService: VaccineClinicsService,
    private clinicLocation: ClinlicLocationService,
    private routerr: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('VaccineId')!; // Non-null assertion
        this.VaccineId=id;
        return this.vaccineClinicService.GatAllClincsHasThisVaccine(id);
      })
    ).subscribe(
      data => {
        this.vaccineClinic = data;
        console.log(this.vaccineClinic);

        this.vaccineClinic.forEach(element => {
          console.log(element.clinicID)
          this.getClinckwithLocatiion(element.clinicID);
        });
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
  }

  getClinckwithLocatiion(id: number): void {
    this.clinicLocation.GatClincsWithLocations(id).subscribe(
      data2 => {
        this.vaccineClinicLocation.push(...data2); // Use spread operator to push array elements
        console.log(data2);
      },
      error => {
        console.error('An error occurred while fetching clinic locations:', error);
      }
    );
  }

  getStars(rate: number): number[] {
    return Array(rate).fill(0).map((x, i) => i);
  }
  
  GoToClinic(clinicId: number): void {
    this.routerr.navigate([`/ReservationVaccine/${clinicId}/${this.VaccineId}`]);

  }
}