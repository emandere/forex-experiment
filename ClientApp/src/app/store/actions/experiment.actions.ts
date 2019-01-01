import { Action } from '@ngrx/store';
import {Experiment} from "../../models/experiment";
export enum ExperimentActionTypes {
  LoadExperiments = '[Experiment] Load Experiments',
  SetExperiments = '[Experiment] Set Experiments',
  SendNewExperiment = '[Experiment] Send NewExperiment',
  SendCreateExperiment = '[Experiment] Send CreateExperiment',
  SendNewExperimentResponse = '[Experiment] Send NewExperiment Response',
  SelectExperimentForComparison = '[Experiment] Select Experiment for Compare',
  RemoveExperimentForComparison ='[Experiment] Remove Experiment for Compare'
}

export class LoadExperiments implements Action {
  readonly type = ExperimentActionTypes.LoadExperiments;
}

export class SetExperiments implements Action {
  readonly type = ExperimentActionTypes.SetExperiments;
  constructor(public payload: Experiment[]) {}
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
  constructor(public payload: string) {}
}

export class SendCreateExperiment implements Action {
  readonly type = ExperimentActionTypes.SendCreateExperiment;
  constructor(public payload: Experiment) {}
}

export class RemoveExperimentForComparison implements Action{
  readonly type = ExperimentActionTypes.RemoveExperimentForComparison
  constructor (public payload:string){}
}

export type ExperimentActions = LoadExperiments 
                                | SetExperiments
                                | SendNewExperiment 
                                | SendNewExperimentResponse 
                                | SendCreateExperiment
                                | SelectExperimentForComparison
                                | RemoveExperimentForComparison;
