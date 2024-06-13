import { Component, OnInit } from '@angular/core';
import { UserPetInfoServiceService } from '../../../Services/user-pet-info-service.service';
import { UserPetInfo } from '../../../Models/user-pet-info';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { AccountServiceService } from '../../../Services/account-service.service';
import { CommonModule } from '@angular/common';
import { MyRequestService } from '../../../Services/my-request.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-userProfile-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userProfile-pet-info.component.html',
  styleUrl: './userProfile-pet-info.component.css'
})
export class UserProfilePetInfoComponent 
{
  constructor(public userpetInfoService: UserPetInfoServiceService,
              public account: AccountServiceService, 
              public router: Router, 
              public requestForBreedService: MyRequestService
             ){
              this.Upload();
              }

  userPetList : UserPetInfo[]=[];
  userPetInfoSub: Subscription|null= null;
  userID: number= Number(this.account.r.id);
  petInfo: UserPetInfo|null= null;
  url:string='https://localhost:7066/Resources/'

  Upload(): void{
            this.userpetInfoService.getPetByUserId(4).subscribe(
            {
              next:(UserPetInfoData)=>
              {
                this.userPetList=UserPetInfoData;
                console.log(this.userPetList)

                UserPetInfoData.forEach(element => {
                  element.photo=this.url+element.photo
                  element.idNoteBookImage=this.url+element.idNoteBookImage
                  this.userpetInfoService.isPaired(element.petID).subscribe({
                  next:(d)=>{
                      console.log(d);
                      if(d.petIDSender==element.petID){
                        element.pairWith=d.receiverPetName;
                        }
                      else{
                        element.pairWith=d.senderPetName;
                    }
                   
                  }, 
                      error
                      : (error)=>{element.pairWith= "i'm not paired"}
                  })
                });
            }});        
}

ngAfterViewInit() {this.Upload()}
        
  navigateToAdd(){
      this.router.navigateByUrl("PetRegister");
      }

  MakePetReadyForBreed(petId: number){
    this.requestForBreedService.makeThisPetBeReadyForBreeding(petId).subscribe(
      {
        next:(d)=>{console.log(d)}
      }
    );
    Swal.fire("Your Pet Is Ready For Breeding")
    console.log("ready");
  }

  navigateToEdit(id: number){
    this.router.navigateByUrl(`userPetEdit/${id}`);
  }
}

