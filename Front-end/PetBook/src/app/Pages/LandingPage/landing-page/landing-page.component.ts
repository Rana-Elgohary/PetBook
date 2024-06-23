import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../Core/Header/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  images = [
    'url(../../../../assets/Images/Heroimage1.jpg)', 
    'url(https://www.usatoday.com/money/blueprint/images/uploads/2023/06/27134316/best-pet-insurance-scaled-e1687873423254.jpg)',  
    'url(https://www.census.gov/newsroom/stories/pet-day/_jcr_content/root/responsivegrid/responsivegrid_1749353263/imagecore.coreimg.jpeg/1680634248356/stories-pet3-1300x867.jpeg)',  
    'url(../../../../assets/Images/Heroimage2.jpg)', 
    'url(https://cottagelife.com/wp-content/uploads/2014/07/shutterstock_1676506852.jpg)',  
];
  
currentIndex = 0;

ngOnInit(): void {
  this.changeBackground();
  setInterval(() => this.changeBackground(), 4000);
}
changeBackground(): void {
  const slideshow = document.getElementById('HeroPhoto');
  if (slideshow) {
    setTimeout(() => {
      slideshow.style.backgroundImage = this.images[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 500); 
  }
}
}

