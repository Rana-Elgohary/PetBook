import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { AccountServiceService } from '../../../Services/account-service.service';
import { UserDetails } from '../../../Models/UserDetails';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

User:UserDetails=new UserDetails(0,"","","","","","",0,"","",0);
userid :number= parseInt(this.AccountService.r.id);
private imageUrlBase: string = 'https://localhost:7066/Resources/';
  constructor(public userService:UserService,public AccountService:AccountServiceService ,public  router:Router){}

  ngOnInit(): void {
    this.loadUserData(this.userid);
  }

  loadUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(user => {
      user.photo = this.imageUrlBase + user.photo;
      this.User = user;
      console.log(user);
    });
  }

  onButtonClick(userId: number): void {
    this.loadUserData(userId);

    this.router.navigateByUrl("/Account");
  }
}

