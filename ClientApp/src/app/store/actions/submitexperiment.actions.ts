import { Action } from '@ngrx/store';
import {Experiment} from "../../models/experiment";
export enum SubmitexperimentActionTypes {
  LoadSubmitexperiments = '[Submitexperiment] Load Submitexperiments',
  SendNewExperiment = '[Submitexperiment] Send NewExperiment',
  SendNewExperimentResponse = '[Submitexperiment] Send NewExperiment Response'
}

export class LoadSubmitexperiments implements Action {
  readonly type = SubmitexperimentActionTypes.LoadSubmitexperiments;
}

export class SendNewExperiment implements Action {
  readonly type = SubmitexperimentActionTypes.SendNewExperiment;
  constructor(public payload: Experiment) {}
}

export class SendNewExperimentResponse implements Action {
  readonly type = SubmitexperimentActionTypes.SendNewExperimentResponse;
  constructor(public payload: string) {}
}

export type SubmitexperimentActions = LoadSubmitexperiments | SendNewExperiment | SendNewExperimentResponse;
