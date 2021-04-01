import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { IFindCity } from 'src/interfaces/find-city.interface';
import { IWeather } from 'src/interfaces/weather.interface';
import { WeatherService } from '../weather.service';
import * as cityActions from 'src/store/actions/weather.actions';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<IWeather[]>;
  isLoading = false;

  constructor(
    private weatherServive: WeatherService,
    private store: Store<{ cities: number[] }>
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      filter(text => text.length >= 2),
      tap(() => this.isLoading = true),
      switchMap(city => this.weatherServive.findCity(city).pipe(
        catchError(_ => of(null)),
      )),
      tap((v) => this.isLoading = false),
      map((weather: IFindCity) => {
        return weather ? weather.list : [];
      }),
    );
  }

  selected(cityId: number): void {
    this.myControl.setValue('');
    this.store.dispatch(cityActions.add({ city: cityId }));
  }
}
