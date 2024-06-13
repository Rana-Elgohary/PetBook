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

import { ClinicComponent } from './Pages/clinic/clinic.component';

import { UserProfilePetInfoComponent } from './Pages/userPetInfo/user-pet-info/userProfile-pet-info.component';
import { noNavigateWithoutLoginGuard } from './Guard/no-navigate-without-login.guard';
import { SearchVaccineComponent } from './Pages/search-vaccine/search-vaccine.component';
import { VaccineClinic } from './Models/vaccine-clinic';
import { SearchVaccineClicnicComponent } from './Pages/search-vaccine-clicnic/search-vaccine-clicnic.component';



export const routes: Routes = [
    {path: "Login", component:UserLoginComponent, title:"Login", canActivate: [noNavigateToLoginPageIfTokenGuard]},
    {path: "PetRegister", component:PetRegisterComponent, title:"Pet Register", canActivate:[noNavigateWithoutLoginGuard]},
    {path: "MyRequest", component:MyRequestComponent, title:"MY Request"},
    {path: "UserSignUp", component:UserSignUpComponent, title:"User Sign-Up", canActivate: [noNavigateToLoginPageIfTokenGuard]},
    {path:"pendingRequest" , component:PendingRequestComponent , title:"pending Request"},
    {path: "Account", component:UserDetailsComponent, title:"Account"},
    {path: "UpdateUser", component:UpdateUserDetailsComponent, title:"Edit"},
    {path: 'Pet/details/:id', component: PetDetailsComponent },
    {path: "BreedSearch", component:BreedSearchComponent, title:"Search Breed"},
    {path: 'Pet/details/:id', component: PetDetailsComponent },
    {path: "userPetInfo",component: UserProfilePetInfoComponent},
    {path: 'Pet/details/:id', component: PetDetailsComponent,title:"Pet Details" },
    {path: 'Pet/information/:id', component: UserPetInfoComponent,title:"User Pet Information" },
    {path:"",component:LandingPageComponent,title:"PetBook"},
    {path:"Vaccine",component:SearchVaccineComponent,title:"Vaccine"},
    { path: 'search-vaccine-clinic/:VaccineId', component: SearchVaccineClicnicComponent },

    { path: 'Pet/details/:id', component: PetDetailsComponent,title:"Pet Details" },
    { path: 'Pet/information/:id', component: UserPetInfoComponent,title:"User Pet Information" }


    ,{ path: 'Clinic/:clinicId', component: ClinicComponent,title:"Clinic Details" }




];

