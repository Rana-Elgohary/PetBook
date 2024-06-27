import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PetDetails } from '../Models/pet-details';

@Injectable({
  providedIn: 'root'
})
export class BreedSearchService {
  private url: string = 'https://localhost:7066/Resources/';
  private baseApiUrl: string = 'https://localhost:7066/api/Pet/';

  constructor(private http: HttpClient) { }
  
  getPetsReadyForBreeding(ownerId: number): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(`${this.baseApiUrl}SearchPetsReadyForBreeding`).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }


  getCatsReadyForBreeding(ownerId: number): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(`${this.baseApiUrl}SearchCatsReadyForBreeding`).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }

  getDogsReadyForBreeding(ownerId: number): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(`${this.baseApiUrl}SearchDogsReadyForBreeding`).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }


  getFemalesReadyForBreeding(ownerId: number): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(`${this.baseApiUrl}SearchFemalesReadyForBreeding`).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }


  getMalesReadyForBreeding(ownerId: number): Observable<PetDetails[]> {
    return this.http.get<PetDetails[]>(`${this.baseApiUrl}SearchMalesReadyForBreeding`).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }

  searchBreedNameOfPetsReadyForBreeding(ownerId: number, breedName: string): Observable<PetDetails[]> {
    const encodedSearchQuery = encodeURIComponent(breedName);
    const searchUrl = `${this.baseApiUrl}SearchBreedNameOfPetsReadyForBreeding?name=${encodedSearchQuery}`;
    return this.http.get<PetDetails[]>(searchUrl).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }

  filterPetsReadyForBreeding(type: string | null, sex: string | null, ownerId: number): Observable<PetDetails[]> {
    let queryParams = [];
    if (type) queryParams.push(`Type=${type}`);
    if (sex) queryParams.push(`sex=${sex}`);
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return this.http.get<PetDetails[]>(`${this.baseApiUrl}FilterPetsReadyForBreeding${queryString}`).pipe(
      map(pets => pets.filter(pet => pet.userID !== ownerId).map(pet => {
        pet.photo = this.url + pet.photo;
        return pet;
      }))
    );
  }
}
