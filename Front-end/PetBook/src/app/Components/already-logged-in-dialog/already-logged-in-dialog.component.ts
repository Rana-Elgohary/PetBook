import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 

@Component({
  selector: 'app-already-logged-in-dialog',
  standalone: true,
  imports: [],
  templateUrl: './already-logged-in-dialog.component.html',
  styleUrl: './already-logged-in-dialog.component.css'
})
export class AlreadyLoggedInDialogComponent {

  constructor(private dialogRef: MatDialogRef<AlreadyLoggedInDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
