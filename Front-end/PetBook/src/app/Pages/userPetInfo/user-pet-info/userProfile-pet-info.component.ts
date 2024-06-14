import { Component, OnInit } from '@angular/core';
import { UserPetInfoServiceService } from '../../../Services/user-pet-info-service.service';
import { UserPetInfo } from '../../../Models/user-pet-info';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountServiceService } from '../../../Services/account-service.service';
import { CommonModule } from '@angular/common';
import { MyRequestService } from '../../../Services/my-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userProfile-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userProfile-pet-info.component.html',
  styleUrls: ['./userProfile-pet-info.component.css']
})
export class UserProfilePetInfoComponent implements OnInit {
  userPetList: UserPetInfo[] = [];
  userPetInfoSub: Subscription | null = null;
  userID: number = Number(this.account.r.id);
  petInfo: UserPetInfo | null = null;
  url: string = 'https://localhost:7066/Resources/';

  constructor(
    public userpetInfoService: UserPetInfoServiceService,
    public account: AccountServiceService,
    public router: Router,
    public requestForBreedService: MyRequestService
  ) {
    this.Upload();
  }

  ngOnInit(): void {
    this.Upload();
  }

  Upload(): void {
    this.userpetInfoService.getPetByUserId(this.userID).subscribe({
      next: (UserPetInfoData) => {
        this.userPetList = UserPetInfoData;
        
        console.log(this.userPetList);

        UserPetInfoData.forEach(element => {
          element.photo = this.url + element.photo;
          element.idNoteBookImage = this.url + element.idNoteBookImage;
          element.isReadyForBreeding = element.readyForBreeding;  // Initialize the property

          this.userpetInfoService.isPaired(element.petID).subscribe({
            next: (d) => {
              console.log(d);
              if (d.petIDSender == element.petID) {
                element.pairWith = d.receiverPetName;
              } else {
                element.pairWith = d.senderPetName;
              }
            },
            error: (error) => {
              element.pairWith = "I'm not paired";
            }
          });
        });
      }
    });
  }

  ngAfterViewInit() {
    this.Upload();
  }

  navigateToAdd() {
    this.router.navigateByUrl("PetRegister");
  }

  toggleBreedingStatus(pet: UserPetInfo) {
    if (pet.isReadyForBreeding) {
      // Handle the case when the pet is already ready for breeding
      this.requestForBreedService.makeThisPetBeNotReadyForBreeding(pet.petID).subscribe({
        next: (d) => {
          console.log(d);
          Swal.fire("Your Pet Is Not Ready For Breeding");
          this.requestForBreedService.DeleteALLReq(pet.petID).subscribe({
            next:(d)=>{console.log(d)}
          });
        }
      });
    } else {
      // Handle the case when the pet is not ready for breeding
      this.requestForBreedService.makeThisPetBeReadyForBreeding(pet.petID).subscribe({
        next: (d) => {
          console.log(d);
          Swal.fire("Your Pet Is Ready For Breeding");
        }
      });
    }
    pet.isReadyForBreeding = !pet.isReadyForBreeding;  // Toggle the breeding status
  }



UnPair(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to unpair this pet?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, unpair it!',
    cancelButtonText: 'No, keep it paired'
  }).then((result) => {
    if (result.isConfirmed) {
      this.requestForBreedService.deletePair(id).subscribe({
        next: (d) => {
          console.log(d); 
        }

      });
      Swal.fire('Unpaired!', 'The pet has been unpaired.', 'success');
      this.Upload();
    }
  });
}


  navigateToEdit(id: number) {
    this.router.navigateByUrl(`userPetEdit/${id}`);
  }
}
