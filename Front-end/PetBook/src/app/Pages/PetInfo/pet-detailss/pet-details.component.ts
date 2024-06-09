import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { PetDetails } from '../../../Models/pet-details';
import { UserPetDetails } from '../../../Models/user-pet-details';
import { RequestForBreed } from '../../../Models/request-for-breed';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [],
  templateUrl:'./pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {


    pet: PetDetails | undefined;
    owner: UserPetDetails | undefined;
    clientPets: PetDetails[] = [];
    breedRequests: RequestForBreed[] = [];
    selectedPetType: string | undefined;
  
    constructor(
      private route: ActivatedRoute,
      private petDetailsService: PetDetailsService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const petId = +params['id'];
        console.log('ngOnInit: petId', petId);
        this.loadPetDetails(petId);
      });
    }
  
  
    loadPetDetails(petId: number) {
      console.log('loadPetDetails: petId', petId);
      this.petDetailsService.getPetDetails(petId).subscribe(
        (pet: PetDetails) => {
          console.log('loadPetDetails: pet', pet);
          this.pet = pet;
          this.loadOwnerDetails(pet.userID);
        },
        error => {
          console.error('Error fetching pet details:', error);
        }
      );
    }
  
    loadOwnerDetails(userId: number) {
      console.log('loadOwnerDetails: userId', userId);
      this.petDetailsService.getuserDetails(userId).subscribe(
        (user: UserPetDetails) => {
          console.log('loadOwnerDetails: user', user);
          this.owner = user;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  
    loadClientPets(clientId: number): void {
      this.petDetailsService.getClientPets(clientId).subscribe(pets => {
        this.clientPets = pets.filter(pet => pet.type === this.selectedPetType);
      });
    }
  
    loadBreedRequests(): void {
      this.petDetailsService.getBreedRequests().subscribe(requests => {
        this.breedRequests = requests;
      });
    }
  
    // isPetPaired(petId: number): boolean {
    //   return this.breedRequests.some(request =>
    //     (request === petId || request.PetIDReceiver === petId) && request.Pair
    //   );
    // }
  
    onPairButtonClick(): void {
      // Handle Pair button click here
      // e.g., show a modal or a new section with the client's pets
    }
  }