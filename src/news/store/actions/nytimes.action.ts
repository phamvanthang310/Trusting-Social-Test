import { Action } from '@ngrx/store';
import { Response } from '../../models';

export const LOAD_NEW_YORK_TIMES = '[news] Load New York Times';
export const LOAD_NEW_YORK_TIMES_SUCCESS = '[new] Load New York Times Success';
export const LOAD_NEW_YORK_TIMES_FAILED = '[new] Load New York Times Failed';

export class LoadNewYorkTimes implements Action {
  readonly type = LOAD_NEW_YORK_TIMES;

  constructor(public payload: number) {
  }
}

export class LoadNewYorkTimesSuccess implements Action {
  readonly type = LOAD_NEW_YORK_TIMES_SUCCESS;

  constructor(public payload: Response) {
  }
}

export class LoadNewYorkTimesFailed implements Action {
  readonly type = LOAD_NEW_YORK_TIMES_FAILED;

  constructor(public payload: any) {
  }
}

export type NewsAction = LoadNewYorkTimes | LoadNewYorkTimesSuccess | LoadNewYorkTimesFailed;
