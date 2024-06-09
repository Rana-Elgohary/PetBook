import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreedDetails } from '../../Models/breed-details';
import { PetDetails } from '../../Models/pet-details';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-breed-search',
  standalone: true,
  imports: [FormsModule , NgFor , NgIf, NgForOf],
  templateUrl: './breed-search.component.html',
  styleUrl: './breed-search.component.css'
})
export class BreedSearchComponent implements OnInit {
    pets: PetDetails[] = []; // get list of pets available for breeding
    Breeds: PetDetails[] = [];  //for search breedname to get the pets available for breed with this name 
    searchQuery: string = '';
    showSearchBar: boolean = false; // Variable to toggle search bar visibility
    url:string='https://localhost:7066/Resources/';
    constructor(private http: HttpClient) {}
    ngOnInit() {
      this.fetchPets();
    }
    fetchPets() {
      this.http.get<PetDetails[]>('https://localhost:7066/api/Pet/SearchPetsReadyForBreeding')
        .subscribe(
          pets => {
            for (let index = 0; index < pets.length; index++) {
              pets[index].photo=this.url+pets[index].photo
            }
            this.pets = pets;
            
            console.log(pets);
          },
          error => {
            console.error('Error fetching pets:', error);
          }
        );
    }

   
    SearchBar() {
      this.showSearchBar = !this.showSearchBar;
    }
  
    searchBar() {
      if (this.searchQuery.trim() !== '') {
        // Encode the search query to handle special characters properly
        const encodedSearchQuery = encodeURIComponent(this.searchQuery);
    
        // Construct the dynamic URL with the encoded search query
        const Searchurl = `https://localhost:7066/api/Pet/SearchBreedNameOfPetsReadyForBreeding?name=${encodedSearchQuery}`;
        console.log(Searchurl);
        // Make the HTTP request with the dynamic URL
        this.http.get<PetDetails[]>(Searchurl)
          .subscribe(
            breeds => {
              this.Breeds=breeds;

              this.pets=this.Breeds;

              for (let index = 0; index < this.pets.length; index++) {
                this.pets[index].photo=this.url+this.pets[index].photo
              }
              console.log(this.pets);
            
            },
            error => {
              console.error('Error fetching pets:', error);
            }
          );
      } else {
        // If the search query is empty, fetch all pets
        this.fetchPets();
      }}}

