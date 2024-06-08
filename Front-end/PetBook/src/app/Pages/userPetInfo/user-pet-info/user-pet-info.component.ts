import { Component, OnInit } from '@angular/core';
import { UserPetInfoServiceService } from '../../../Services/user-pet-info-service.service';
import { UserPetInfo } from '../../../Models/user-pet-info';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { AccountServiceService } from '../../../Services/account-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-pet-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-pet-info.component.html',
  styleUrl: './user-pet-info.component.css'
})
export class UserPetInfoComponent implements OnInit {
constructor(public userpetInfoService: UserPetInfoServiceService, public account: AccountServiceService, public router: Router){}

 userPetList : UserPetInfo[]=[];
  userPetInfoSub: Subscription|null= null;
  userID: number= Number(this.account.r.id);
  ngOnInit(): void{
          this.userpetInfoService.getPetByUserId(5).subscribe({
            next:(UserPetInfoData)=>{
              this.userPetList=UserPetInfoData;
              this.userPetList.forEach(element => {
                console.log(element);
              });
              console.log(this.userPetList)

            }
          }
        )
          };

          // navigateToAdd(){
          //   this.router.navigateByUrl();
          // }
    }
  

