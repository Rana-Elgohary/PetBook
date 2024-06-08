import { Routes } from '@angular/router';
import { UserLoginComponent } from './Pages/user-login/user-login.component';
import { UserSignUpComponent } from './Pages/user-sign-up/user-sign-up.component';
import { PetRegisterComponent } from './Pages/pet-register/pet-register.component';
import { noNavigateToLoginPageIfTokenGuard } from './Guard/no-navigate-to-login-page-if-token.guard';
import { PetDetailsComponent } from './Pages/PetInfo/pet-detailss/pet-details.component';

export const routes: Routes = [
    {path: "Login", component:UserLoginComponent, title:"Login", canActivate: [noNavigateToLoginPageIfTokenGuard]},

    {path: "UserSignUp", component:UserSignUpComponent, title:"User Sign-Up"},
    {path: "PetRegister", component:PetRegisterComponent, title:"Pet Register"},
{ path: 'Pet/details/:id', component: PetDetailsComponent },


];
