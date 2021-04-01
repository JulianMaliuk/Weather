import { createReducer, on } from '@ngrx/store';
import { add, remove, set } from '../actions/weather.actions';

const storage = JSON.parse(localStorage.getItem('__storage__') || '{}');

export const initialState: number[] = storage.cities || [];

const _citiesReducer = createReducer(
  initialState,
  on(set, (state, { cities }) => cities),
  on(add, (state, { city }) => [...state, city]),
  on(remove, (state, { city }) => state.filter(id =>id !== city)),
);

export function citiesReducer(state, action) {
  return _citiesReducer(state, action);
}
