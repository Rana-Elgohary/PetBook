import { Component } from '@angular/core';
import { UserPetDetails } from '../../../../Models/user-pet-details';
import { PetDetails } from '../../../../Models/pet-details';
import { ActivatedRoute } from '@angular/router';
import { PetDetailsService } from '../../../../Services/pet-details.service';
import { AccountServiceService } from '../../../../Services/account-service.service';

@Component({
  selector: 'app-user-pet-info',
  standalone: true,
  imports: [],
  templateUrl: './user-pet-info.component.html',
  styleUrl: './user-pet-info.component.css'
})
export class UserPetInfoComponent {
  pet: PetDetails | undefined;
  owner: UserPetDetails | undefined;
  url:string='https://localhost:7066/Resources/'

  constructor(
    private route: ActivatedRoute,
    private petDetailsService: PetDetailsService,
    public Account:AccountServiceService   ,
   
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
}
