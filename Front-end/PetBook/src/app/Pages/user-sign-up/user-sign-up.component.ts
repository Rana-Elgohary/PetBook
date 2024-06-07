import { Component } from '@angular/core';
import { InputSectionComponent } from '../../Components/input-section/input-section.component';
import { UserClient } from '../../Models/user-client';
import { AccountServiceService } from '../../Services/account-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up',
  standalone: true,
  imports: [InputSectionComponent, FormsModule, CommonModule],
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.css'
})
export class UserSignUpComponent {
  user:UserClient = {
    name:"",
    email: "",
    password: "",
    phone: "",
    userName: "",
    location: "",
    age: 0,
    sex: "",
    photo: null,
    roleID: 1
  }

  constructor(public accountService:AccountServiceService, public router:Router){  }


  SignUp(){
    this.accountService.SignUp(this.user).subscribe({
      next: (response) => {
        this.router.navigate(['/Login']);
      },
      error:(err) =>{
        console.log(err)
      }
    });
  }

  onFileSelected(event:any){
    this.user.photo = event.target.files[0];
  } 
}