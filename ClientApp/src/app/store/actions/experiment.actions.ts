import { Action } from '@ngrx/store';
import {Experiment} from "../../models/experiment";
export enum ExperimentActionTypes {
  LoadSubmitexperiments = '[Experiment] Load Submitexperiments',
  SendNewExperiment = '[Experiment] Send NewExperiment',
  SendCreateExperiment = '[Experiment] Send CreateExperiment',
  SendNewExperimentResponse = '[Experiment] Send NewExperiment Response',
  SelectExperimentForComparison = '[Experiment] Select Experiment for Compare'
}

export class LoadSubmitexperiments implements Action {
  readonly type = ExperimentActionTypes.LoadSubmitexperiments;
}

export class SendNewExperiment implements Action {
  readonly type = ExperimentActionTypes.SendNewExperiment;
  constructor(public payload: Experiment) {}
}

export class SendNewExperimentResponse implements Action {
  readonly type = ExperimentActionTypes.SendNewExperimentResponse;
  constructor(public payload: string) {}
}

export class SelectExperimentForComparison implements Action {
  readonly type = ExperimentActionTypes.SelectExperimentForComparison;
  constructor(public payload: Experiment) {}
}

export class SendCreateExperiment implements Action {
  readonly type = ExperimentActionTypes.SendCreateExperiment;
  constructor(public payload: Experiment) {}
}

export type ExperimentActions = LoadSubmitexperiments 
                                | SendNewExperiment 
                                | SendNewExperimentResponse 
                                | SendCreateExperiment
                                | SelectExperimentForComparison;
