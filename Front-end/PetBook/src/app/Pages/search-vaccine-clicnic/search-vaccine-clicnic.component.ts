import { Component, OnInit } from '@angular/core';
import { VaccineClinicsService } from '../../Services/vaccine-clinics.service';
import { VaccineClinic } from '../../Models/vaccine-clinic';
import { switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-vaccine-clicnic',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgFor],
  templateUrl: './search-vaccine-clicnic.component.html',
  styleUrl: './search-vaccine-clicnic.component.css'
})
export class SearchVaccineClicnicComponent implements OnInit {

  vaccieid:number | undefined;
  vaccineClinic:VaccineClinic[]=[];
  constructor(
    private route: ActivatedRoute,
    private vaccineClinicService: VaccineClinicsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = +params.get('VaccineId')!; // Non-null assertion
        return this.vaccineClinicService.GatAllClincsHasThisVaccine(id);
      })
    ).subscribe(data => {
      this.vaccineClinic = data;
      console.log(this.vaccineClinic);
    }, error => {
      console.error('An error occurred:', error);
    });
  }
  getStars(rate: number): number[] {
    return Array(rate).fill(0).map((x, i) => i);
  }
}