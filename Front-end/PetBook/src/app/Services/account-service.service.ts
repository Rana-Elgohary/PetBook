import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  // r ==> to get the claim results in this variable
  r: { UserName:string, Name:string, id:string, RoleId:string } = { UserName:"", Name:"", id:"", RoleId:"" };
  constructor(public http:HttpClient, private router: Router) 
  { 
    this.CheckToken()
  }

  isAuthenticated=false;
  baseUrl="";
  
  private CheckToken(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.isAuthenticated = true;
      this.r = jwtDecode(token);
      console.log(this.r.UserName);
      console.log(this.r.Name);
      console.log(this.r.id);
      console.log(this.r.RoleId);
    } else {
      this.isAuthenticated = false;
    }
  }

  Login(email: string, password: string) {
    const params = new HttpParams().set('email', email).set('password', password);
    
    this.http.get(this.baseUrl + '/login', { params, responseType: 'text' }).subscribe(d => {
      this.isAuthenticated = true;
      localStorage.setItem("token", d);
      try {
        this.r = jwtDecode(d);
        console.log(this.r);

        this.router.navigateByUrl("/home");
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    });
  }
 
  logout(){
    this.isAuthenticated=false;
    localStorage.removeItem("token");
  }
}
 
 
