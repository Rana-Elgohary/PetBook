import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserClient } from '../Models/user-client';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  // r ==> to get the claim results in this variable
  r: { UserName:string, Name:string, id:string, RoleId:string } = { UserName:"", Name:"", id:"", RoleId:"" };
  constructor(public http:HttpClient, private router: Router, private snackBar: MatSnackBar) 
  { 
    this.CheckToken()
  }

  isAuthenticated=false;
  baseUrl="https://localhost:7066/api/Account";
  
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
    
    this.http.get(`${this.baseUrl}?email=${email}&password=${password}`, { params, responseType: 'text' })
    .subscribe(d => {
      this.isAuthenticated = true;
      localStorage.setItem("token", d);
      try {
        this.r = jwtDecode(d);
        console.log(this.r);

        this.router.navigateByUrl("");
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Show a snackbar for invalid email or password
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 5000, // Duration in milliseconds
            verticalPosition: 'top' // Position of the snackbar
          });
        } else {
          // Handle other errors
          console.error('An error occurred:', error.error);
        }
      }
    );
  }
 
  logout(){
    this.isAuthenticated=false;
    localStorage.removeItem("token");
  }

  SignUp(user:UserClient){
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phone', user.phone);
    formData.append('userName', user.userName);
    formData.append('location', user.location);
    formData.append('age', user.age.toString()); // Convert age to string before appending
    formData.append('sex', user.sex);
    formData.append('roleID', user.roleID.toString()); // Convert roleID to string before appending

    if (user.photo) {
      formData.append('photo', user.photo);
    }

    return this.http.post(`${this.baseUrl}/Register`, formData);
      // return this.http.post(`${this.baseUrl}/Register`, user);
    }
}
 
 
