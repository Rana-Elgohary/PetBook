import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vaccine } from '../Models/vaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  Vacciens = [
    "COVID-19 Vaccine",
    "Influenza Vaccine",
    "Measles, Mumps, and Rubella (MMR) Vaccine",
    "Hepatitis B Vaccine",
    "Pneumococcal Vaccine"
  ];

  getVaccineSuggestions(input: string): string[] {
    return this.Vacciens.filter(Vacc => Vacc.toLowerCase().includes(input.toLowerCase()));
  }

  url="https://localhost:7066/api/Vaccine";
  constructor(private http: HttpClient) {}

  GatAllVaccine(){
    return this.http.get<Vaccine[]>(this.url)
  }

  GatVaccineByName(name:string){
    return this.http.get<Vaccine>(`${this.url}/vaccineName/${name}`)
  }
  
  
}
