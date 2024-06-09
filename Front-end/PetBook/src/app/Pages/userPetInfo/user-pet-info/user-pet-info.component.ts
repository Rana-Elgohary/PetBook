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
  selector: 'app-user-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-pet-info.component.html',
  styleUrl: './user-pet-info.component.css'
})
export class UserPetInfoComponent implements OnInit {
constructor(public userpetInfoService: UserPetInfoServiceService, public account: AccountServiceService, public router: Router, public requestForBreedService: MyRequestService){}

 userPetList : UserPetInfo[]=[];
  userPetInfoSub: Subscription|null= null;
  userID: number= Number(this.account.r.id);
  isPaired:any= [];
  ngOnInit(): void{
          this.userpetInfoService.getPetByUserId(5).subscribe(
          {
            next:(UserPetInfoData)=>
            {
              this.userPetList=UserPetInfoData;
              console.log(this.userPetList)
        
          }});
          this.userPetList.forEach(element => {
            this.requestForBreedService.CheckIfThisPetOndate(element.petID).subscribe({
             next:(d)=>{
              this.isPaired.push(d);
              console.log(this.isPaired);
             }
             })
           })
           
        }
          // navigateToAdd(){
          //   this.router.navigateByUrl();
          // }
        }