import { createAction, props } from '@ngrx/store';

export const set = createAction('[City] Set', props<{cities: number[]}>());
export const add = createAction('[City] Add', props<{city: number}>());
export const remove = createAction('[City] Remove', props<{city: number}>());
