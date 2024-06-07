import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyRequestService {

  constructor(public http:HttpClient) { }

  baseUrl='https://localhost:7066/api/RequestBreed/UserSenderID/4'

  
}
