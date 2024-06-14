import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clinic } from '../Models/clinic';
import { Doctor } from '../Models/doctor';
import { Reservation } from '../Models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  
  private apiUrl = 'https://localhost:7066/'; 

  constructor(private http: HttpClient) { }

  getClinicbyId(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(`${this.apiUrl}api/Clinic/id?id=${id}`);
  }

  getInfoClinicbyname(clinicName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}api/ClinicLocation/search/${clinicName}`);
  }

  getDoctors(clinicId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}api/Doctor/${clinicId}/doctors`);
  }


  bookAppointment(reservation: Reservation): Observable<any> {
    return this.http.post(`${this.apiUrl}api/Reservation`, reservation);
  }
}
