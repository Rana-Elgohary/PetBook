import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { AccountServiceService } from '../../../Services/account-service.service';
import { UserDetails } from '../../../Models/UserDetails';
import { UserUpdateDetails } from '../../../Models/user-update-details';

@Component({
  selector: 'app-update-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user-details.component.html',
  styleUrl: './update-user-details.component.css'
})
export class UpdateUserDetailsComponent {

  user:UserUpdateDetails=new UserUpdateDetails(0,"","","","","","",0,"",null,0);
  userid:number=parseInt(this.account.r.id);
  private imageUrlBase: string = 'https://localhost:7066/Resources/';
  constructor(public userService:UserService
    ,public activatedRoute:ActivatedRoute,
  public router:Router ,
  public account:AccountServiceService
  ){}
  ngOnInit(): void {
    this.loadUserData(this.userid)
  }

  loadUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(user => {
      user.photo = this.imageUrlBase + user.photo;
      this.user = user;
      console.log(user)
    });
  }
  save(){
    const updateUser = { ...this.user };

    this.userService.updateUser(this.userid,this.user).subscribe(d=>{
      console.log(d);
      this.router.navigateByUrl("/Account");
    });
  }

  updateUserPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
