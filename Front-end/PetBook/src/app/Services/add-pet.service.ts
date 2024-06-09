import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPet } from '../Models/add-pet';
import { AddBreedToPet } from '../Models/add-breed-to-pet';
import { Breed } from '../Models/breed';

@Injectable({
  providedIn: 'root'
})
export class AddPetService {
  private baseurl="https://localhost:7066/api"

  constructor(public http: HttpClient) { }

  AddPet(pet: AddPet) {
    return this.http.post(`${this.baseurl}/Pet`, pet);
  }

  AddPetBreed(petBreed: AddBreedToPet){
    return this.http.post(`${this.baseurl}/PetBreed`, petBreed);
  }

  getBreed(){
    return this.http.get<Breed[]>(`${this.baseurl}/Breed`)
  }
}
