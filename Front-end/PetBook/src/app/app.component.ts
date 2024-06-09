import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Core/Header/header/header.component';
import { FooterComponent } from './Core/Footer/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,


  imports: [RouterOutlet, RouterLink, HeaderComponent,FooterComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PetBook';
}
