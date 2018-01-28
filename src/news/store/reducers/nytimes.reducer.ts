import { News } from '../../models';
import { LOAD_NEW_YORK_TIMES, LOAD_NEW_YORK_TIMES_FAILED, LOAD_NEW_YORK_TIMES_SUCCESS, NewsAction, } from '../actions';

export interface NYTState {
  entities: { [id: string]: News };
  loading: boolean;
  loaded: boolean;
  error?: any;
}

const initialState: NYTState = {
  entities: {},
  loading: false,
  loaded: false
};

export function nytReducer(state = initialState, action: NewsAction): NYTState {

  switch (action.type) {
    case LOAD_NEW_YORK_TIMES: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case LOAD_NEW_YORK_TIMES_SUCCESS: {
      const entities = action.payload.response.docs.reduce(
        (entity: { [id: number]: News }, news: News) => {
          return {
            ...entity,
            [news._id]: news,
          };
        }, {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
    case LOAD_NEW_YORK_TIMES_FAILED: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true
      };
    }
  }

  return state;
}

