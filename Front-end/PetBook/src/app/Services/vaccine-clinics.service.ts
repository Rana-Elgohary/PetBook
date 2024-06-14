import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VaccineClinic } from '../Models/vaccine-clinic';

@Injectable({
  providedIn: 'root'
})
export class VaccineClinicsService {

  url='https://localhost:7066/api/VaccineClinic';
  constructor(private http: HttpClient) {}

  GatAllClincsHasThisVaccine(id:number){
    return this.http.get<VaccineClinic[]>(`${this.url}/vaccineClinicInclude/${id}`)
  }

}
