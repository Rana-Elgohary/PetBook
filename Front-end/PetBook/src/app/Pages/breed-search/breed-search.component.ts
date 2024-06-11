import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreedDetails } from '../../Models/breed-details';
import { PetDetails } from '../../Models/pet-details';
import { HttpClient } from '@angular/common/http';
import { AutoCorrectService } from '../../Services/auto-correct.service';

@Component({
  selector: 'app-breed-search',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgForOf],
  templateUrl: './breed-search.component.html',
  styleUrl: './breed-search.component.css'
})
export class BreedSearchComponent implements OnInit {

  pets: PetDetails[] = []; // get list of pets available for breeding
  Breeds: PetDetails[] = []; // for search breed name to get the pets available for breed with this name
  searchQuery: string = '';
  breedSuggestions: string[] = [];
  showFilterMenu: boolean = false; // Variable to toggle filter menu visibility
  filteredPets: PetDetails[] = []; // Filtered list based on search and filter criteria
  filterType: string = ''; // For filtering by dog or cat
  showSearchBar: boolean = false; // Variable to toggle search bar visibility
  noResults: boolean = false;

  url: string = 'https://localhost:7066/Resources/';
  constructor(private http: HttpClient, public autoCorrectService: AutoCorrectService) { }

  ngOnInit() {
    this.fetchPets();
  }

  fetchPets() {
    this.http.get<PetDetails[]>('https://localhost:7066/api/Pet/SearchPetsReadyForBreeding')
      .subscribe(
        pets => {
          for (let index = 0; index < pets.length; index++) {
            pets[index].photo = this.url + pets[index].photo;
          }
          this.pets = pets;
          this.noResults = this.pets.length === 0;
        },
        error => {
          console.error('Error fetching pets:', error);
        }
      );
  }

  SearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  applyFilter() {
    if (this.filterType === '') {
      this.fetchPets();
    } else if (this.filterType === 'Cat') {
      this.http.get<PetDetails[]>('https://localhost:7066/api/Pet/SearchCatsReadyForBreeding')
        .subscribe(
          pets => {
            for (let index = 0; index < pets.length; index++) {
              pets[index].photo = this.url + pets[index].photo;
            }
            this.pets = pets;
            this.noResults = this.pets.length === 0;
          },
          error => {
            console.error('Error fetching pets:', error);
          }
        );
    } else if (this.filterType === 'Dog') {
      this.http.get<PetDetails[]>('https://localhost:7066/api/Pet/SearchDogsReadyForBreeding')
        .subscribe(
          pets => {
            for (let index = 0; index < pets.length; index++) {
              pets[index].photo = this.url + pets[index].photo;
            }
            this.pets = pets;
            this.noResults = this.pets.length === 0;
          },
          error => {
            console.error('Error fetching pets:', error);
          }
        );
    }
  }

  onInputChange() {
    this.breedSuggestions = this.autoCorrectService.getBreedSuggestions(this.searchQuery);
    this.noResults = this.breedSuggestions.length === 0;
  }

  selectBreed(breed: string) {
    this.searchQuery = breed;
    this.breedSuggestions = [];
    this.searchBar();
  }
  hideSuggestions() {
    this.breedSuggestions = [];
  }

  searchBar() {
    if (this.searchQuery.trim() !== '') {
      const encodedSearchQuery = encodeURIComponent(this.searchQuery);
      const searchUrl = `https://localhost:7066/api/Pet/SearchBreedNameOfPetsReadyForBreeding?name=${encodedSearchQuery}`;
      this.http.get<PetDetails[]>(searchUrl)
        .subscribe(
          breeds => {
            this.Breeds = breeds;
            this.pets = this.Breeds;
            for (let index = 0; index < this.pets.length; index++) {
              this.pets[index].photo = this.url + this.pets[index].photo;
            }
            this.noResults = this.pets.length === 0;
          },
          error => {
            console.error('Error fetching pets:', error);
            this.noResults = true;
          }
        );
    } else {
      this.fetchPets();
      this.hideSuggestions();
    }
  }
}
