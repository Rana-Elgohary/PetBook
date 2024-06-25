import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreedDetails } from '../../Models/breed-details';
import { PetDetails } from '../../Models/pet-details';
import { HttpClient } from '@angular/common/http';
import { AutoCorrectService } from '../../Services/auto-correct.service';
import { SignalRServiceService } from '../../Services/signal-rservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AccountServiceService } from '../../Services/account-service.service';
import { BreedSearchService } from '../../Services/breed-search.service';

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
  OwnderId:number= parseInt(this.AccountService.r.id);

  url: string = 'https://localhost:7066/Resources/';

  constructor(private http: HttpClient, 
    public autoCorrectService: AutoCorrectService, 
    public signalRService:SignalRServiceService,
     public router:Router,
     public AccountService:AccountServiceService,
     public breedSearchService: BreedSearchService
     ) { }

  ngOnInit() {
    this.signalRService.startConnection()
    this.signalRService.PetWithReadyForBreedTrueListener((pet) => {
      pet.photo = this.url+pet.photo
      this.pets.push(pet)
    })
    this.signalRService.PetWithReadyForBreedFalseListener((pet) => {
      this.pets.forEach(element => {
        if(element.petID == pet.petID){
          this.pets = this.pets.filter(item => item !== element)
        }
      });
    })

    this.fetchPets();
  }

  fetchPets() {
    this.breedSearchService.getPetsReadyForBreeding(this.OwnderId).subscribe(
      pets => {
        this.pets = pets;
        this.noResults = this.pets.length === 0;
      },
      error => {
        console.error('Error fetching pets:', error);
      }
    );
  }
  chooseme(id:number){
    this.router.navigateByUrl(`Pet/details/${id}`)
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
      this.breedSearchService.getCatsReadyForBreeding(this.OwnderId).subscribe(
        pets => {
          this.pets = pets;
          this.noResults = this.pets.length === 0;
        },
        error => {
          console.error('Error fetching pets:', error);
        }
      );
    } else if (this.filterType === 'Dog') {
      this.breedSearchService.getDogsReadyForBreeding(this.OwnderId).subscribe(
        pets => {
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
      this.breedSearchService.searchBreedNameOfPetsReadyForBreeding(this.OwnderId, this.searchQuery).subscribe(
        breeds => {
          this.Breeds = breeds;
          this.pets = this.Breeds;
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
  //-------------------original-----------------
}
