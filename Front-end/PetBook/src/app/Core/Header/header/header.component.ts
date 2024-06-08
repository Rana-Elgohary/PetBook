import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../../../Services/account-service.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
constructor(private account : AccountServiceService){}
userName : string= "";
Logout(){
  this.account.logout
}
ngOnInit(): void {
  this.account.r.UserName = this.userName
}
}
