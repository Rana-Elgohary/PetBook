import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetDetailsService } from '../../../Services/pet-details.service';
import { PetDetails } from '../../../Models/pet-details';
import { UserPetDetails } from '../../../Models/user-pet-details';

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

  constructor(
    private route: ActivatedRoute,
    private petDetailsService: PetDetailsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = +params['id'];
      this.loadPetDetails(petId);
    });
  }

  loadPetDetails(petId: number) {
    this.petDetailsService.getPetDetails(petId).subscribe((pet: PetDetails) => {
      this.pet = pet;
      this.loadOwnerDetails(pet.userID);
    });
  }

  loadOwnerDetails(userId: number) {
    this.petDetailsService.getuserDetails(userId).subscribe((user: UserPetDetails) => {
      this.owner = user;
    });
  }
}
