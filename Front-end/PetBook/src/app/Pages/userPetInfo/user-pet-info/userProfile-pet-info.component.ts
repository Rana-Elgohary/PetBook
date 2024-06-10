import { Component, OnInit } from '@angular/core';
import { UserPetInfoServiceService } from '../../../Services/user-pet-info-service.service';
import { UserPetInfo } from '../../../Models/user-pet-info';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { AccountServiceService } from '../../../Services/account-service.service';
import { CommonModule } from '@angular/common';
import { MyRequestService } from '../../../Services/my-request.service';

@Component({
  selector: 'app-userProfile-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userProfile-pet-info.component.html',
  styleUrl: './userProfile-pet-info.component.css'
})
export class UserProfilePetInfoComponent implements OnInit {
constructor(public userpetInfoService: UserPetInfoServiceService, public account: AccountServiceService, public router: Router, public requestForBreedService: MyRequestService){}

 userPetList : UserPetInfo[]=[];
  userPetInfoSub: Subscription|null= null;
  userID: number= Number(this.account.r.id);
  petInfo: UserPetInfo|null= null;
  ngOnInit(): void{
          this.userpetInfoService.getPetByUserId(5).subscribe(
          {
            next:(UserPetInfoData)=>
            {
              this.userPetList=UserPetInfoData;
              console.log(this.userPetList)
              this.userPetList.forEach(element => {
                this.requestForBreedService.CheckIfThisPetOndate(element.petID).subscribe({
                 next:(d)=>{
                  element.pairWith=d;
                  console.log(d);
                 }
                 })
               })
          }});
           
        }
          // navigateToAdd(){
          //   this.router.navigateByUrl();
          // }
        }