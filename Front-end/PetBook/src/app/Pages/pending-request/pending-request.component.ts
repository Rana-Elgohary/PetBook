import { Component, OnInit } from '@angular/core';
import { RequestBreed } from '../../Models/request-breed';
import { MyRequestService } from '../../Services/my-request.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetDetails } from '../../Models/pet-details';
import { AccountServiceService } from '../../Services/account-service.service';

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
  userId :number= parseInt(this.AccountService.r.id);
  
  constructor(
    public myrequest: MyRequestService,
    public activateRoute: ActivatedRoute,
    public AccountService:AccountServiceService 

  ) {}

  Confirm(petIDSender: number, petIDReceiver: number): void {
    console.log("hello")
    this.myrequest.CheckIfThisPetOndate(petIDSender).subscribe(petDetailsSender => {
      this.pet1 = petDetailsSender;
      this.myrequest.CheckIfThisPetOndate(petIDReceiver).subscribe(petDetailsReceiver => {
        this.pet2 = petDetailsReceiver;
          console.log(this.pet1?.readyForBreeding ,this.pet2?.readyForBreeding)
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
        else {
          // Handle the else case where one or both pets are not ready for breeding
          this.showPopup('One or both pets are not ready for breeding.');
        }
      }, error => {
        console.error('Error fetching pet details for receiver', error);
      });
    }, error => {
      console.error('Error fetching pet details for sender', error);
    });
  }

  ngOnInit(): void {
    this.userId=6;
    this.myrequest.getallPendingReq(this.userId).subscribe(data => {
      this.request = data;
      console.log(this.request);
    });
  }
  showPopup(message: string): void {
    alert(message); // This is just a placeholder. Replace with actual popup implementation.
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
