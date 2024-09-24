import { Component, DestroyRef, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  constructor(
    private _httpClient: HttpClient,
    private _destroyRef: DestroyRef
  ) {}
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);

    /* {observe:'response"} is not mandatory.
     Could add add another param in subscribe. 
     */
    const subscription = this._httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((datas) => datas.places),
        catchError((error) =>
          throwError(() => new Error('Problem with the request'))
        )
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error: Error) => {
          console.log(error.message);
          this.error.set('Problem with the request');
        },
      });
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
