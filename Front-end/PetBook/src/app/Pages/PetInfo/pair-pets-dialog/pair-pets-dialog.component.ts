import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pair-pets-dialog',
  standalone: true,
  imports: [CommonModule ],
  template:   `
  <div class="background-image flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
    <h1 mat-dialog-title class="text-center text-3xl mb-4 text-white">Select a Pet to Pair</h1>
    <div mat-dialog-content class="w-full">
      <div *ngFor="let pet of data.pets" class="pet-item flex justify-center items-center" (click)="selectPet(pet.petID)">
        <img [src]="pet.photo" alt="Pet" class="w-12 h-12 rounded-full mr-2">
        <span class="text-lg text-orange">{{ pet.name }}</span>
      </div>
    </div>
    <div mat-dialog-actions class="mt-4 flex justify-center">
      <button mat-button class="bg-orange-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400" (click)="onNoClick()">Cancel</button>
    </div>
  </div>
`,
styles: [`
  .pet-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .pet-item:hover {
    background-color: #f0f0f0;
  }
  .background-image {
            background-image: url('/assets/Images/PetInfoBG.png'); 
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 40vh; 
            width: 100%;
        }

`]

})
export class PairPetsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PairPetsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectPet(petId: number): void {
    this.dialogRef.close(petId);
  }
}
