import { Action } from '@ngrx/store';

export enum GetindicatorsActionTypes {
  LoadGetindicators = '[Getindicators] Load Getindicatorss'
}

export class LoadGetindicators implements Action {
  readonly type = GetindicatorsActionTypes.LoadGetindicators;
}

export type GetindicatorsActions = LoadGetindicators;
export type IndicatorActions = LoadGetindicators
