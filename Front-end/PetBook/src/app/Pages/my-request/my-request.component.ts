import { Component, OnInit } from '@angular/core';
import { MyRequestService } from '../../Services/my-request.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RequestBreed } from '../../Models/request-breed';

@Component({
  selector: 'app-my-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']  // Corrected the typo here
})
export class MyRequestComponent implements OnInit {

  UserId:number| null =null;
  request: RequestBreed[] = [];  // Ensure this is an array

  constructor(
    public myrequest: MyRequestService,
    public activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.UserId=4;
    this.myrequest.getallSendingReq(this.UserId).subscribe(data => {
      this.request = data;
      console.log(this.request);
    });
  }
  removeRequest(SId: number, RId: number): void {
    this.myrequest.DeleteReq(SId, RId).subscribe(response => {
      console.log(response);  // Log the response
      if (response === 'deleted') {
        this.request = this.request.filter(item => !(item.petIDSender === SId && item.petIDReceiver === RId));
      }
    }, error => {
      console.error('Error deleting request:', error);
    });
  }
}
