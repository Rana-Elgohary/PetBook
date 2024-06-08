import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../Models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl="https://localhost:7066/api/User"

  constructor(public http: HttpClient) { }

  getUserById(id: number) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<UserDetails>(`${this.baseurl}/id`, {params});
  }

  UpdateUser(user:UserDetails){
    return this.http.put<UserDetails>(this.baseurl,user);
  }
}
