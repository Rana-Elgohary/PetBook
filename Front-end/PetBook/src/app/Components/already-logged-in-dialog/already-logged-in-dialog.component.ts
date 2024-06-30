import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-already-logged-in-dialog',
  standalone: true,
  imports: [],
  templateUrl: './already-logged-in-dialog.component.html',
  styleUrl: './already-logged-in-dialog.component.css'
})
export class AlreadyLoggedInDialogComponent {

  constructor(private dialogRef: MatDialogRef<AlreadyLoggedInDialogComponent>, private router:Router) {}

  close(): void {
    this.router.navigateByUrl("")
    this.dialogRef.close();
  }
}
