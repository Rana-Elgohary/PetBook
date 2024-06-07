import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AlreadyLoggedInDialogComponent } from './Components/already-logged-in-dialog/already-logged-in-dialog.component';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(), provideAnimationsAsync(), 
    importProvidersFrom(BrowserAnimationsModule), importProvidersFrom(MatDialogModule)], //step 1 to connect to data base
};
