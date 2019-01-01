import { Action } from '@ngrx/store';
import {Experiment} from '../../models/experiment';

export enum ExperimentAnalysisActionTypes {
  SetExperimentAnalysis = '[ExperimentAnalysis] Set ExperimentAnalysis'
}

export class SetExperimentAnalysis implements Action {
  readonly type = ExperimentAnalysisActionTypes.SetExperimentAnalysis;
 
  constructor(public payload: string) {}
}

export type ExperimentAnalysisActions = SetExperimentAnalysis;
