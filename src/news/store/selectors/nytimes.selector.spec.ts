import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { NewsState, reducers } from '../reducers';
import { getNewYorkTimesEntities, getNewYorkTimesLoading, getNewYorkTimesNews } from './nytimes.selector';
import { News, Response } from '../../models';
import { LoadNewYorkTimes, LoadNewYorkTimesSuccess } from '../actions';

describe('New York Times Selector', () => {
  let store: Store<NewsState>;

  const newYorkTimesResponse = {
    status: 'OK',
    response: {
      docs: [{
        _id: '1',
        snippet: 'news snippet #1',
      }, {
        _id: '2',
        snippet: 'news snippet #2',
      }, {
        _id: '3',
        snippet: 'news snippet #3',
      }],
    },
  } as Response;

  const entities = {
    1: newYorkTimesResponse.response.docs[0],
    2: newYorkTimesResponse.response.docs[1],
    3: newYorkTimesResponse.response.docs[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({news: combineReducers(reducers)}),
      ],
    }).compileComponents();

    store = TestBed.get(Store);
  });

  describe('getNewYorkTimesEntities', () => {
    it('should return state of news as entities', () => {
      let result: { [id: string]: News };

      store.select(getNewYorkTimesEntities).subscribe(value => result = value);

      expect(result).toEqual({});

      store.dispatch(new LoadNewYorkTimesSuccess(newYorkTimesResponse));

      expect(result).toEqual(entities);
    });
  });

  describe('getNewYorkTimesNews', () => {
    it('should return state of news as a collection', () => {
      let result: Array<News>;

      store.select(getNewYorkTimesNews).subscribe(value => result = value);

      expect(result).toEqual([]);

      store.dispatch(new LoadNewYorkTimesSuccess(newYorkTimesResponse));

      expect(result).toEqual(newYorkTimesResponse.response.docs);
    });
  });

  describe('getNewYorkTimesLoading', () => {
    it('should return state of news loading as boolean', () => {
      let loading: boolean;

      store.select(getNewYorkTimesLoading).subscribe(value => loading = value);

      expect(loading).toEqual(false);

      store.dispatch(new LoadNewYorkTimes(0));

      expect(loading).toEqual(true);

      store.dispatch(new LoadNewYorkTimesSuccess(newYorkTimesResponse));

      expect(loading).toEqual(false);
    });
  });
});
