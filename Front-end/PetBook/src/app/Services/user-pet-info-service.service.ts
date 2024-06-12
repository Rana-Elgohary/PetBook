import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPetInfo } from '../Models/user-pet-info';

@Injectable({
  providedIn: 'root'
})
export class UserPetInfoServiceService {
  baseURL= "https://localhost:7066/api/Pet/";

  constructor(public http: HttpClient) {}
  
    getPetByUserId(id : number):Observable<UserPetInfo[]>
    {
      const url= `${this.baseURL}GetByUserID/${id}`;
      return this.http.get<UserPetInfo[]>(url);
    }

}
