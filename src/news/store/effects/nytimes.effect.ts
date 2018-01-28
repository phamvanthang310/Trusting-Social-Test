import { Injectable } from '@angular/core';
import { NYTimesServices } from '../../services/nytimes.services';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_NEW_YORK_TIMES, LoadNewYorkTimesFailed, LoadNewYorkTimesSuccess } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Response } from '../../models';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NytimesEffect {
  @Effect()
  loadNewYorkTimes$ = this.action$.ofType(LOAD_NEW_YORK_TIMES).pipe(
    switchMap(() => this.nytService.getNews()),
    map((response: Response) => new LoadNewYorkTimesSuccess(response)),
    catchError(error => of(new LoadNewYorkTimesFailed(error)))
  );

  constructor(private nytService: NYTimesServices, private action$: Actions) {

  }
}
