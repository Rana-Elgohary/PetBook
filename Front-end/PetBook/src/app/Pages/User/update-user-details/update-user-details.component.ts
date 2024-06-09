import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { AccountServiceService } from '../../../Services/account-service.service';
import { UserDetails } from '../../../Models/UserDetails';

@Component({
  selector: 'app-update-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user-details.component.html',
  styleUrl: './update-user-details.component.css'
})
export class UpdateUserDetailsComponent {

  user:UserDetails=new UserDetails("","","","","","",0,"","",0);
  constructor(public userService:UserService
    ,public activatedRoute:ActivatedRoute,
  public router:Router ,
  public account:AccountServiceService
  ){}
  ngOnInit(): void {
    let userid:number= parseInt(this.account.r.id)
    this.activatedRoute.params.subscribe(p=>{
      this.userService.getUserById(userid).subscribe(d=>{
        this.user=d;
        console.log(d);
      })
    })
  }
  save(){
    this.userService.UpdateUser(this.user).subscribe(d=>{
      console.log(d);
      this.router.navigateByUrl("/Account");
    });
  }
}
