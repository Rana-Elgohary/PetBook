import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetDetails } from '../Models/pet-details';
import { Observable } from 'rxjs';
import { UserPetDetails } from '../Models/user-pet-details';

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {

  constructor(private http: HttpClient) { }
  baseurl="https://localhost:7066"

  getPetDetails(petId: number): Observable<PetDetails> {
  
    return this.http.get<PetDetails>(`/api/Pet/${petId}`);
  }
  getuserDetails(userId: number): Observable<UserPetDetails> {
  
    return this.http.get<UserPetDetails>(`/api/User/${userId}`);
  }
}
