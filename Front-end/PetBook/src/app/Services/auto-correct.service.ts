import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Breed {
  breedID: number;
  breed1: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutoCorrectService {

  breeds: string[] = [];

  private url = 'https://localhost:7066/api/Breed';

  constructor(private http: HttpClient) {
    this.fetchBreeds();
  }

  // Method to fetch all breeds and update the breeds array
  private fetchBreeds(): void {
    this.http.get<Breed[]>(this.url)
      .pipe(
        map((data: Breed[]) => data.map(breed => breed.breed1))
      )
      .subscribe((names: string[]) => {
        this.breeds = names;
      });
  }

  // Method to get breed suggestions based on input
  getBreedSuggestions(input: string): string[] {
    this.fetchBreeds();
    return this.breeds.filter(breed => breed.toLowerCase().includes(input.toLowerCase()));
  }
}
