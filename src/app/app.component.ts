import { Component, OnInit } from '@angular/core';
import { ILocation } from '../interfaces/location.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myLocation: ILocation;
  cities$: Observable<number[]>;

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{ cities: number[] }>
  ) {
    this.cities$ = store.select('cities');
  }

  ngOnInit(): void {
    this.getLocalWeather();
  }

  async getLocalWeather(): Promise<void> {
    try {
      this.myLocation = await this.getPosition();
    } catch (e) {
      this._snackBar.open(e.message, null, {
        duration: 2000,
      });
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
}
