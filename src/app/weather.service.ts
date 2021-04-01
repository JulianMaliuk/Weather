import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/interfaces/location.interface';
import { IWeather } from 'src/interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = 'e273b24aaa1538dd38b99d1692deadf6';
  private API_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  fetch(city: string | number | ILocation): Observable<any> {
    switch (typeof city) {
      case 'number': return this.http.get(`${this.API_URL}/weather?id=${city}&appid=${this.API_KEY}&units=metric`);
      case 'string': return this.http.get(`${this.API_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric`);
      case 'object': return this.http.get(`${this.API_URL}/weather?lat=${city.lat}&lon=${city.lng}&appid=${this.API_KEY}&units=metric`);
      default: throw new Error('Not implemented');
    }
  }

  findCity(city: string) {
    return this.http.get(`${this.API_URL}/find?q=${city}&appid=${this.API_KEY}&units=metric&lang=uk`);
  }
}
