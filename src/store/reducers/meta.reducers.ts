import { ActionReducer, MetaReducer, Action } from '@ngrx/store';

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
      return function(state: S, action: A): S {
        const nextState = reducer(state, action);
        localStorage.setItem('__storage__', JSON.stringify(nextState))
        return nextState;
      };
    }

export const metaReducers: MetaReducer<any>[] = [storageMetaReducer];
