import { initialState, nytReducer, NYTState } from './nytimes.reducer';
import {
  LoadNewYorkTimes,
  LoadNewYorkTimesFailed,
  LoadNewYorkTimesSuccess,
  NewsAction
} from '../actions/nytimes.action';
import { Response } from '../../models/response';
import { News } from '../../models/news';

describe('The New York Times Reducers', () => {
  describe('undefined action', () => {
    it('should return default value state', () => {
      const action = {} as any;
      const state = nytReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_NEW_YORK_TIMES action', () => {
    let action: NewsAction;
    let state: NYTState;

    beforeEach(() => {
      action = new LoadNewYorkTimes(0);
      state = nytReducer(initialState, action);
    });

    it('should set loading to true', () => {
      expect(state.loading).toBeTruthy();
      expect(state.loaded).toBeFalsy();
      expect(state.entities).toEqual({});
    });

    it('should populate the page value', () => {
      expect(state.page).toEqual(0);
    });
  });

  describe('LOAD_NEW_YORK_TIMES_SUCCESS action', () => {
    let state: NYTState;
    let entities: { [id: string]: News };

    beforeEach(() => {
      const news1 = {
        _id: '1',
        snippet: 'news #1 snippet',
      } as News;
      const news2 = {
        _id: '2',
        snippet: 'news #2 snippet',
      } as News;
      const payload = {
        status: 'OK',
        response: {
          docs: [news1, news2],
        },
      } as Response;
      const action = new LoadNewYorkTimesSuccess(payload);
      entities = {1: news1, 2: news2};
      state = nytReducer(initialState, action);
    });

    it('should populate the news entity', () => {
      expect(state.loaded).toBeTruthy();
      expect(state.entities).toEqual(entities);
    });

    it('should set loading to false', () => {
      expect(state.loading).toBeFalsy();
    });

    it('should set loaded to true', () => {
      expect(state.loaded).toBeTruthy();
    });
  });

  describe('LOAD_NEW_YORK_TIMES_FAILED action', () => {
    it('should populate the error message', () => {
      const action = new LoadNewYorkTimesFailed('loading error');
      const state = nytReducer(initialState, action);

      expect(state.loaded).toBeFalsy();
      expect(state.loading).toBeFalsy();
      expect(state.error).toEqual('loading error');
    });
  });
});
