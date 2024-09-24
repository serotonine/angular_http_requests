import { Component, DestroyRef, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  ngOnInit() {
    const subscription = this._httpClient
      /* {observe:'response"} is not mandatory.
     Could add add another param in subscribe. 
     */
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((datas) => datas.places))
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
      });
    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
