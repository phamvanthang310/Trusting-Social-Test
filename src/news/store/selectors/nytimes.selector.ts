import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewsState } from '../reducers';
import { NYTState } from '../reducers/nytimes.reducer';

export const getNewsState = createFeatureSelector<NewsState>('news');

export const getNewYorkTimesState = createSelector(getNewsState,
  (state: NewsState) => state.newYorkTimes);

export const getNewYorkTimesEntities = createSelector(getNewYorkTimesState,
  (state: NYTState) => state.entities);

export const getNewYorkTimesNews = createSelector(getNewYorkTimesEntities,
  entities => {
    return Object.keys(entities).map(key => entities[key]);
  });

export const getNewYorkTimesLoading = createSelector(getNewYorkTimesState,
  (state: NYTState) => state.loading);
