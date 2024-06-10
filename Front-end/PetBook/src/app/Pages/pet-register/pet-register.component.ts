import { Component, OnInit } from '@angular/core';
import { InputSectionComponent } from '../../Components/input-section/input-section.component';
import { AddPet } from '../../Models/add-pet';
import { AddBreedToPet } from '../../Models/add-breed-to-pet';
import { Breed } from '../../Models/breed';
import { AddPetService } from '../../Services/add-pet.service';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../Services/account-service.service';
import { CommonModule } from '@angular/common';
import { UserPetInfoServiceService } from '../../Services/user-pet-info-service.service';
import { lastValueFrom, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pet-register',
  standalone: true,
  imports: [InputSectionComponent, FormsModule, CommonModule],
  templateUrl: './pet-register.component.html',
  styleUrl: './pet-register.component.css'
})
export class PetRegisterComponent implements OnInit {
  constructor(public addPet:AddPetService, public account:AccountServiceService, public userPetInfo:UserPetInfoServiceService){}

  ngOnInit(): void {
    this.addPet.getBreed().subscribe({
      next: (response) => {
        this.breedsList = response
      },
      error:(err) =>{
        console.log(err)
      }
    })
    this.Pet.userID = +this.account.r.id
  }

  Pet:AddPet={
    name:"",
    photo: null,
    idNoteBookImage: null,
    ageInMonth: 0,
    sex: "",
    userID:1,
    readyForBreeding: false,
    type: "",
    other: "",
  }

  breedPet:AddBreedToPet={
    petID:0,
    breedID:0,
  }

  breedsList:Breed[]=[]

  onFileSelected(event:any){
    this.Pet.photo = event.target.files[0];
  }

  onFileSelectedBookImage(event:any){
    this.Pet.idNoteBookImage = event.target.files[0];
  }

  async SignUp() {
    try {
      // Step 1: Add the pet
      const addPetResponse = await lastValueFrom(this.addPet.AddPet(this.Pet));
      console.log('Pet added successfully:', addPetResponse);
  
      // Step 2: Get pet information by user ID
      const petInfoResponse = await lastValueFrom(this.userPetInfo.getPetByUserId(this.Pet.userID)) || [];
  
      petInfoResponse.forEach(element => {
        if (element.name === this.Pet.name && element.ageInMonth === this.Pet.ageInMonth && element.other === this.Pet.other &&
            element.type === this.Pet.type && element.sex === this.Pet.sex) {
          this.breedPet.petID = element.petID;
        }
      });
  
      // Step 3: Add pet breed
      const addPetBreedResponse = await lastValueFrom(this.addPet.AddPetBreed(this.breedPet));
      console.log('Pet breed added successfully:', addPetBreedResponse);
  
      // Success message or any further actions after successful signup
    } catch (err: any) {
      if (err.error && err.error.errors) {
        // Log and display validation errors
        console.log('Validation errors:', err.error.errors);
        // Handle displaying errors to the user, e.g., show them in a dialog or form
      } else {
        // Handle other types of errors
        console.error('An error occurred:', err);
        // Display a generic error message to the user
      }
    }
  }
  
}
