import { Routes } from '@angular/router';
import { UserLoginComponent } from './Pages/user-login/user-login.component';
import { UserSignUpComponent } from './Pages/user-sign-up/user-sign-up.component';
import { PetRegisterComponent } from './Pages/pet-register/pet-register.component';
import { noNavigateToLoginPageIfTokenGuard } from './Guard/no-navigate-to-login-page-if-token.guard';
import { MyRequestComponent } from './Pages/my-request/my-request.component';
import { PendingRequestComponent } from './Pages/pending-request/pending-request.component';


import { UserDetailsComponent } from './Pages/User/user-details/user-details.component';
import { UpdateUserDetailsComponent } from './Pages/User/update-user-details/update-user-details.component';
import { LandingPageComponent } from './Pages/LandingPage/landing-page/landing-page.component';
import { PetDetailsComponent } from './Pages/PetInfo/pet-detailss/pet-details.component';

import { UserPetInfoComponent } from './Pages/PetInfo/Pet-Inf/user-pet-info/user-pet-info.component';

import { BreedSearchComponent } from './Pages/breed-search/breed-search.component';


export const routes: Routes = [
    {path: "Login", component:UserLoginComponent, title:"Login", canActivate: [noNavigateToLoginPageIfTokenGuard]},
    {path: "UserSignUp", component:UserSignUpComponent, title:"User Sign-Up"},
    {path: "PetRegister", component:PetRegisterComponent, title:"Pet Register"},
    {path: "MyRequest", component:MyRequestComponent, title:"MY Request"},

    {path: "UserSignUp", component:UserSignUpComponent, title:"User Sign-Up", canActivate: [noNavigateToLoginPageIfTokenGuard]},
    {path: "PetRegister", component:PetRegisterComponent, title:"Pet Register"},
    {path:"pendingRequest" , component:PendingRequestComponent , title:"pending Request"},
    {path: "Account", component:UserDetailsComponent, title:"Account"},
    {path: "UpdateUser", component:UpdateUserDetailsComponent, title:"Edit"},

    {path: "BreedSearch", component:BreedSearchComponent, title:"Search Breed"},

    {path:"",component:LandingPageComponent,title:"PetBook"},
    { path: 'Pet/details/:id', component: PetDetailsComponent,title:"Pet Details" },
    { path: 'Pet/information/:id', component: UserPetInfoComponent,title:"User Pet Information" }



];

