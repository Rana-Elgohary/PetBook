import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VaccineClinicLocation } from '../Models/vaccine-clinic-location';

@Injectable({
  providedIn: 'root'
})
export class ClinlicLocationService {

  url='https://localhost:7066/api/ClinicLocation/locationinclude/';
  constructor(private http: HttpClient) {}

  GatClincsWithLocations(id:number){
    return this.http.get<VaccineClinicLocation[]>(`${this.url}${id}`)
  }
}
