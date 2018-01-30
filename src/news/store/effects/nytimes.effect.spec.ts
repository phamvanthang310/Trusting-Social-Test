import { TestBed } from '@angular/core/testing';
import { NytimesEffect } from './nytimes.effect';
import { NYTimesServices } from '../../services/nytimes.services';
import { Observable } from 'rxjs/Observable';
import { Response } from '../../models/response';
import { of } from 'rxjs/observable/of';
import { Actions } from '@ngrx/effects';
import { empty } from 'rxjs/observable/empty';
import { LoadNewYorkTimes, LoadNewYorkTimesSuccess } from '../actions/nytimes.action';
import { marbles } from 'rxjs-marbles';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

describe('NytimesEffect', () => {
  let action$: TestActions;
  let service: NYTimesServices;
  let effect: NytimesEffect;

  const response = {
    status: 'OK',
    response: {
      docs: [{
        _id: '1',
        snippet: 'news #1 snippet',
      }, {
        _id: '2',
        snippet: 'news #2 snippet',
      }],
    },
  } as Response;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NytimesEffect,
        NYTimesServices,
        {provide: Actions, useValue: new TestActions()}
      ]
    });

    action$ = TestBed.get(Actions);
    service = TestBed.get(NYTimesServices);
    effect = TestBed.get(NytimesEffect);

    spyOn(service, 'getNews').and.returnValue(of(response));
  });

  it('should be created', () => {
    expect(effect).toBeTruthy();
    expect(service).toBeTruthy();
    expect(action$).toBeTruthy();
  });

  describe('loadNewYorkTimes$', () => {
    it('should return a collection from LoadNewYorkTimesSuccess', marbles((m) => {
      const action = new LoadNewYorkTimes(0);
      const completion = new LoadNewYorkTimesSuccess(response);

      action$.stream = m.hot('-a', {a: action});
      const expected = m.cold('-b', {b: completion});

      m.expect(effect.loadNewYorkTimes$).toBeObservable(expected);
    }));
  });

  afterEach(marbles((m) => {
    m.teardown();
  }));
});
