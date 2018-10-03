import { Action } from '@ngrx/store';

export enum SubmitexperimentActionTypes {
  LoadSubmitexperiments = '[Submitexperiment] Load Submitexperiments'
}

export class LoadSubmitexperiments implements Action {
  readonly type = SubmitexperimentActionTypes.LoadSubmitexperiments;
}

export type SubmitexperimentActions = LoadSubmitexperiments;
