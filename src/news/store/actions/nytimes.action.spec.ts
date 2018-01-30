import {
  LOAD_NEW_YORK_TIMES,
  LOAD_NEW_YORK_TIMES_FAILED,
  LOAD_NEW_YORK_TIMES_SUCCESS,
  LoadNewYorkTimes,
  LoadNewYorkTimesFailed,
  LoadNewYorkTimesSuccess
} from './nytimes.action';

describe('Load New York Times Actions', () => {
  describe('Load New York Times', () => {
    it('should create an action', () => {
      const page = 0;
      const action = new LoadNewYorkTimes(page);

      expect({...action}).toEqual({
        type: LOAD_NEW_YORK_TIMES,
        payload: page
      });
    });
  });

  describe('Load New York Times Success', () => {
    it('should create an action', () => {
      const payload = {
        status: 'OK',
        response: {
          docs: [{
            _id: '123',
            pub_date: '2017-12-16T15:00:00',
            snippet: 'news snippet',
            source: 'news source',
            multimedia: [{
              subType: 'xlarge',
              url: 'image/sample.jpg'
            }],
            headline: {
              main: 'news head line'
            },
            web_url: 'http://localhost:4200/mock'
          }],
        },
      };
      const action = new LoadNewYorkTimesSuccess(payload);

      expect({...action}).toEqual({
        type: LOAD_NEW_YORK_TIMES_SUCCESS,
        payload,
      });
    });
  });

  describe('Load New York Times Failed', () => {
    it('should create an action', () => {
      const payload = {message: 'Load Error'};
      const action = new LoadNewYorkTimesFailed(payload);

      expect({...action}).toEqual({
        type: LOAD_NEW_YORK_TIMES_FAILED,
        payload,
      });
    });
  });
});
