import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestBreed } from '../Models/request-breed';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyRequestService {

  constructor(public http: HttpClient) { }

  baseUrl = 'https://localhost:7066/api/RequestBreed/UserSenderID/';
  url = 'https://localhost:7066/api/RequestBreed/';

  getallSendingReq(id: number) {
    return this.http.get<RequestBreed[]>(this.baseUrl + id).pipe(
      catchError(this.handleError)
    );
  }

  DeleteReq(SId: number, RId: number) {
    const deleteUrl = `${this.url}${SId}/${RId}`;
    console.log('DELETE request URL:', deleteUrl);
    return this.http.delete(deleteUrl, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
