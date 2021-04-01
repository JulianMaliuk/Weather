import { IWeather } from "./weather.interface";

export interface IFindCity {
  cod: string
  count: number
  list: IWeather[]
  message: string
}
