import { Component, OnInit } from '@angular/core';
import { ILocation } from '../interfaces/location.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myLocation: ILocation;
  savedCities: number[] = [];

  constructor(
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.savedCities = JSON.parse(localStorage.getItem('savedCities') || '[]');
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

  addCity(city: any): void {
    this.savedCities.push(city);
    localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
  }

  removeCity(city: number): void {
    this.savedCities = this.savedCities.filter(c => city !== c);
    localStorage.setItem('savedCities', JSON.stringify(this.savedCities));
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
