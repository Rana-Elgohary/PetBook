import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicDoctorService {

  url='https://localhost:7066/api/ClinicDoctor';
  constructor(private http: HttpClient) { }
  deleteClinicDoctor(clid: number, dcid: number): Observable<void> {
    const url = `${this.url}/${clid}/${dcid}`;
    return this.http.delete<void>(url);
  }
}
