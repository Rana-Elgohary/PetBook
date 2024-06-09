import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { PetDetails } from '../../../Models/pet-details';
import { UserPetDetails } from '../../../Models/user-pet-details';
import { RequestForBreed } from '../../../Models/request-for-breed';
import { AccountServiceService } from '../../../Services/account-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    url:string='https://localhost:7066/Resources/'
  
    constructor(
      private route: ActivatedRoute,
      private petDetailsService: PetDetailsService,
      public Account:AccountServiceService   ,
      private snackBar: MatSnackBar
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
          pet.photo=this.url+pet.photo
          pet.idNoteBookImage=this.url+pet.idNoteBookImage
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
          user.photo=this.url+user.photo
          this.owner = user;
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    }
    pairPets() {
      const userId = Number(this.Account.r.id);
      const petId = this.pet?.petID || 0; 
      this.petDetailsService.pairPets(petId, userId).subscribe(response => {
        if (response) {
          console.log('Pairing successful');
          this.openSnackBar('Pet paired successfully', 'Close');
        } else {
          this.openSnackBar('The pet is not available for breeding', 'Close');
        }
      }, error => {
        console.error('Pairing failed', error);
        this.openSnackBar('Pairing failed. Please try again later.', 'Close');
      });
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 9000, 
        horizontalPosition: 'center', 
        verticalPosition: 'top' 
      });
    }
    
    
  }