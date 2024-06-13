import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoCorrectService {

  breeds = [
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Boxer",
    "Dachshund",
    "Yorkshire Terrier"
  ];

  getBreedSuggestions(input: string): string[] {
    return this.breeds.filter(breed => breed.toLowerCase().includes(input.toLowerCase()));
  }

  constructor() { }
}