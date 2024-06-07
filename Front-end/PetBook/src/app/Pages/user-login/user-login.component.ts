import { Component } from '@angular/core';
import { InputSectionComponent } from '../../Components/input-section/input-section.component';
import { AccountServiceService } from '../../Services/account-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [InputSectionComponent, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  email:string = ""
  password:string = ""

  constructor(public accountService:AccountServiceService){  }

  Login(){
    this.accountService.Login(this.email, this.password)
  }
  
}
