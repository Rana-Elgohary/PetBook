import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Doctor } from '../Models/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  url='https://localhost:7066/api/Doctor';
  constructor(public http: HttpClient) { }

  updateDoctor(cdoctorData: Doctor): Observable<Doctor> {
    console.log(cdoctorData);
    return this.http.put<Doctor>(this.url, cdoctorData);
  }

  addUserAndDoctor(data: any, clinicId: number): Observable<any> {
    const url = `${this.url}/adduserfirstthenadddoctor?ClinicId=${clinicId}`;
    return this.http.post<any>(url, data);
  }
}
