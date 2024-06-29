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
import { BreedSearchComponent } from './Pages/breed-search/breed-search.component';
import { ClinicComponent } from './Pages/clinic/clinic.component';
import { UserProfilePetInfoComponent } from './Pages/userPetInfo/user-pet-info/userProfile-pet-info.component';
import { noNavigateWithoutLoginGuard } from './Guard/no-navigate-without-login.guard';
import { SearchVaccineComponent } from './Pages/search-vaccine/search-vaccine.component';
import { VaccineClinic } from './Models/vaccine-clinic';
import { SearchVaccineClicnicComponent } from './Pages/search-vaccine-clicnic/search-vaccine-clicnic.component';
import { UserPetInfoEditComponent } from './Pages/user-pet-info-edit/user-pet-info-edit.component';
import { ReservationForVaccineComponent } from './Pages/reservation-for-vaccine/reservation-for-vaccine.component';
import { ClinicSearchComponent } from './Pages/clinic-search/clinic-search.component';
import { SecretaryVaccineComponent } from './Pages/vaccine_Secretary/secretary-vaccine/secretary-vaccine.component';
import { SecretaryComponent } from './Pages/secretary/secretary.component';
import { SecrteryclinicComponent } from './Pages/secrteryclinic/secrteryclinic.component';
import { UserProfileMainComponent } from './Pages/user-profile-main/user-profile-main.component';
import { ShowReservationsComponent } from './Pages/show-reservations/show-reservations.component';

export const routes: Routes = [
    {path: "Login", component:UserLoginComponent, title:"Login", canActivate: [noNavigateToLoginPageIfTokenGuard]},
    {path: "PetRegister", component:PetRegisterComponent, title:"Pet Register", canActivate:[noNavigateWithoutLoginGuard]},
    {path: "UserSignUp", component:UserSignUpComponent, title:"User Sign-Up", canActivate: [noNavigateToLoginPageIfTokenGuard]},
    
    {path: "Profile", component:UserProfileMainComponent, title:"Profile", children:[
        {path: "", redirectTo: "Account", pathMatch: "full" },
        {path: "Account", component:UserDetailsComponent, title:"Account"},
        {path:"pendingRequest", component:PendingRequestComponent , title:"pending Request"},
        {path: "MyRequest", component:MyRequestComponent, title:"MY Request"},
        {path: "userPetInfo",component: UserProfilePetInfoComponent, title:"Pet Information"},
        {path: "Reservations",component: ShowReservationsComponent , title:"Reservatios"},
    ]},

    {path: "UpdateUser", component:UpdateUserDetailsComponent, title:"Edit"},
    {path: "BreedSearch", component:BreedSearchComponent, title:"Search Breed"},
    {path: 'Pet/details/:id', component: PetDetailsComponent,title:"Pet Details" },
    { path: 'Pet/details/:id/:DoNotShowButton', component: PetDetailsComponent,title:"Pet Details"  },
    {path:"Vaccine",component:SearchVaccineComponent,title:"Vaccine"},
    {path: 'search-vaccine-clinic/:VaccineId', component: SearchVaccineClicnicComponent },
    {path:"userPetEdit/:id",component:UserPetInfoEditComponent, title: "Edit Pet Information"},
    {path: 'Clinic/:clinicId', component: ClinicComponent,title:"Clinic Details" },
    {path:"ReservationVaccine/:clinicId/:VaccineId",component:ReservationForVaccineComponent,title:"Reservation Vaccine"},
    {path:"clinics",component:ClinicSearchComponent,title:"Clinics"},
    {path:"vaccines",component:SearchVaccineClicnicComponent,title:"Vaccines"},
    {path: 'secretary-vaccine/:ClinicId', component: SecretaryVaccineComponent ,title:"Secretary-vaccine"},
    {path:"Secretary",component:SecretaryComponent,title:"Secretary"},
    {path:"SecretaryClinic/:id",component:SecrteryclinicComponent,title:"Secretary"},
    {path:"",component:LandingPageComponent,title:"PetBook"},
    {path: '**', redirectTo: '/Account'}
];

