import { Action } from '@ngrx/store';

export enum GetindicatorsActionTypes {
  LoadGetindicators = '[Getindicators] Load Getindicatorss',
  SetIndicators = '[Getindicators] Set Getindicatorss'
}

export class LoadGetindicators implements Action {
  readonly type = GetindicatorsActionTypes.LoadGetindicators;
}

export class SetIndicators implements Action {
  readonly type = GetindicatorsActionTypes.SetIndicators;
 
  constructor(public payload: string[]) {}
}

export type GetindicatorsActions = LoadGetindicators | SetIndicators;
export type IndicatorActions = LoadGetindicators | SetIndicators;
