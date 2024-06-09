import { Component, OnInit } from '@angular/core';
import { InputSectionComponent } from '../../Components/input-section/input-section.component';
import { AddPet } from '../../Models/add-pet';
import { AddBreedToPet } from '../../Models/add-breed-to-pet';
import { Breed } from '../../Models/breed';
import { AddPetService } from '../../Services/add-pet.service';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../Services/account-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-register',
  standalone: true,
  imports: [InputSectionComponent, FormsModule, CommonModule],
  templateUrl: './pet-register.component.html',
  styleUrl: './pet-register.component.css'
})
export class PetRegisterComponent implements OnInit {
  constructor(public addPet:AddPetService, public account:AccountServiceService){}

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
    breebID:0,
  }

  breedsList:Breed[]=[]

  onFileSelected(event:any){
    this.Pet.photo = event.target.files[0];
  }

  onFileSelectedBookImage(event:any){
    this.Pet.idNoteBookImage = event.target.files[0];
  } 

  SignUp(){
    this.addPet.AddPet(this.Pet).subscribe({
      next: (response) => {
        console.log(response)
      },
      error:(err) =>{
        console.log(err)
      }
    });
    this.addPet.AddPetBreed(this.breedPet).subscribe({
      next: (response) => {
        console.log(response)
      },
      error:(err) =>{
        console.log(err)
      }
    })
  }
}
