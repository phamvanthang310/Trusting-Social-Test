import { ActionReducerMap } from '@ngrx/store';
import { nytReducer, NYTState } from './nytimes.reducer';

export interface NewsState {
  newYorkTimes: NYTState;
}

export const reducers: ActionReducerMap<NewsState> = {
  newYorkTimes: nytReducer
};
