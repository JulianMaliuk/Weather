import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILocation } from 'src/interfaces/location.interface';
import { IWeather } from 'src/interfaces/weather.interface';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {
  isLoaded = false;
  position: ILocation;
  weather: IWeather;
  @Input() city: number | string | ILocation;
  @Input() canRemove = false;
  @Output() removeCityEvent = new EventEmitter<number>();

  constructor(private weatherServive: WeatherService) { }

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
    this.weatherServive.fetch(this.city).subscribe(weather => {
      this.weather = weather;
      this.isLoaded = true;
    });
  }

  removeCity(city: number): void {
    this.removeCityEvent.emit(city);
  }
}

