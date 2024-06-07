import { Routes } from '@angular/router';
import { UserLoginComponent } from './Pages/user-login/user-login.component';
import { UserSignUpComponent } from './Pages/user-sign-up/user-sign-up.component';
import { PetRegisterComponent } from './Pages/pet-register/pet-register.component';

export const routes: Routes = [
    {path: "Login", component:UserLoginComponent, title:"Login"},
    {path: "UserSignUp", component:UserSignUpComponent, title:"User Sign-Up"},
    {path: "PetRegister", component:PetRegisterComponent, title:"Pet Register"}
];
