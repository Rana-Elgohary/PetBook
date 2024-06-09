import { Component, OnInit } from '@angular/core';
import { RequestBreed } from '../../Models/request-breed';
import { MyRequestService } from '../../Services/my-request.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetDetails } from '../../Models/pet-details';

@Component({
  selector: 'app-pending-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css'] // Corrected property name
})
export class PendingRequestComponent implements OnInit { // Implementing OnInit

  request: RequestBreed[] = [];  // Ensure this is an array
  pet1: PetDetails | null = null;  // Initialize properties
  pet2: PetDetails | null = null;  // Initialize properties

  constructor(
    public myrequest: MyRequestService,
    public activateRoute: ActivatedRoute
  ) {}

  Confirm(petIDSender: number, petIDReceiver: number): void {
    this.myrequest.CheckIfThisPetOndate(petIDSender).subscribe(petDetailsSender => {
      this.pet1 = petDetailsSender;
      this.myrequest.CheckIfThisPetOndate(petIDReceiver).subscribe(petDetailsReceiver => {
        this.pet2 = petDetailsReceiver;

        if (this.pet1?.readyForBreeding && this.pet2?.readyForBreeding) {
          this.myrequest.updateRequestBreed(petIDSender, petIDReceiver, true)
            .subscribe(response => {
              console.log('Request updated successfully', response);
              this.request = this.request.filter(item => !(item.petIDSender === petIDSender && item.petIDReceiver === petIDReceiver));
            }, error => {
              console.error('Error updating request', error);
            });

            this.myrequest.makeThisPetBeNotReadyForBreeding(petIDSender).subscribe(
              res => console.log(`Pet ${petIDSender} is now not ready for breeding`, res),
              err => console.error(`Error making pet ${petIDSender} not ready for breeding`, err)
            );

            this.myrequest.makeThisPetBeNotReadyForBreeding(petIDReceiver).subscribe(
              res => console.log(`Pet ${petIDReceiver} is now not ready for breeding`, res),
              err => console.error(`Error making pet ${petIDReceiver} not ready for breeding`, err)
            );
        }
      }, error => {
        console.error('Error fetching pet details for receiver', error);
      });
    }, error => {
      console.error('Error fetching pet details for sender', error);
    });
  }

  ngOnInit(): void {
    this.myrequest.getallPendingReq(6).subscribe(data => {
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
