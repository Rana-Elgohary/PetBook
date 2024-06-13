import { Component } from '@angular/core';
import { InputSectionComponent } from '../../Components/input-section/input-section.component';
import { UserClient } from '../../Models/user-client';
import { AccountServiceService } from '../../Services/account-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up',
  standalone: true,
  imports: [InputSectionComponent, FormsModule, CommonModule],
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.css'
})
export class UserSignUpComponent {
  user: UserClient = new UserClient('', '', '', '', '', '', NaN, '', null, 2);

  // Validation flags
  validationErrors: { [key in keyof UserClient]?: boolean | string | null } = {};

  constructor(public accountService:AccountServiceService, public router:Router){  }

  isFormValid(): boolean {
    let isValid = true;

    for (const key in this.user) {
      if (this.user.hasOwnProperty(key)) {
        const field = key as keyof UserClient;
        if (!this.user[field]) {
          this.validationErrors[field] = true;
          isValid = false;
        } else {
          this.validationErrors[field] = false;
        }
      }
    }

    return isValid;
  }

  SignUp() {
    if (this.isFormValid()) {
      this.accountService.SignUp(this.user).subscribe({
        next: (response) => {
          this.router.navigate(['/Login']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  onInputValueChange(event: { field: keyof UserClient, value: any }) {
    const { field, value } = event;
    if (field in this.user) {
      (this.user as any)[field] = value;
      if (value) {
        this.validationErrors[field] = false;
      }
    }
  }

  onFileSelected(event: any) {
    this.user.photo = event.target.files[0];
    this.validationErrors.photo = false;
  }

  onSexChange(event: any) {
    const selectedValue = event.target.value;
    // Assuming you have validation logic, update validationErrors object accordingly
    this.validationErrors.sex = selectedValue ? null : 'Gender is required.';
  }
}