import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetDetails } from '../Models/pet-details';
import { Observable, catchError, throwError } from 'rxjs';
import { UserPetDetails } from '../Models/user-pet-details';
import { RequestForBreed } from '../Models/request-for-breed';

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {

  constructor(private http: HttpClient) { }
  baseurl = "https://localhost:7066";

  getPetDetails(petId: number): Observable<PetDetails> {
    console.log('getPetDetails: petId', petId);
    return this.http.get<PetDetails>(`${this.baseurl}/api/Pet/id`, { params: { id: petId.toString() } }).pipe(
      catchError(error => {
        console.error('Error in getPetDetails:', error);
        return throwError(error);
      })
    );
  }

  getuserDetails(userId: number): Observable<UserPetDetails> {
    console.log('getuserDetails: userId', userId);
    return this.http.get<UserPetDetails>(`${this.baseurl}/api/User/id`, { params: { id: userId.toString() } }).pipe(
      catchError(error => {
        console.error('Error in getuserDetails:', error);
        return throwError(error);
      })
    );
  }
getClientPets(clientId: number): Observable<PetDetails[]> {
  return this.http.get<PetDetails[]>(`${this.baseurl}/api/Client/${clientId}/pets`);
}

getBreedRequests(): Observable<RequestForBreed[]> {
  return this.http.get<RequestForBreed[]>(`${this.baseurl}/api/RequestForBreed`);
}
}
