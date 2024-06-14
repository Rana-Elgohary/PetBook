import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vaccine } from '../Models/vaccine';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  Vacciens:string[] = [];

  getVaccineSuggestions(input: string): string[] {
    return this.Vacciens.filter(Vacc => Vacc.toLowerCase().includes(input.toLowerCase()));
  }


  url="https://localhost:7066/api/Vaccine";
  constructor(private http: HttpClient) {}

  GatAllVaccine(){
    this.GatAllVaccineName();
    return this.http.get<Vaccine[]>(this.url)
  }

  GatAllVaccineName(): void {
    this.http.get<Vaccine[]>(`${this.url}/VaccineNames`)
      .pipe(
        map((data: Vaccine[]) => data.map(vaccine => vaccine.name))
      )
      .subscribe((names: string[]) => {
        this.Vacciens = names;
      });
  }
  
  GatVaccineByName(name:string){
    return this.http.get<Vaccine>(`${this.url}/vaccineName/${name}`)
  }
  
  
}
