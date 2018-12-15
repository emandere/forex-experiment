import { Action } from '@ngrx/store';
import * as ExperimentAnalysisActions from '../actions/experimentAnalysis.actions';
import {Experiment} from '../../models/experiment';
export interface State {
  experiment:Experiment;
}

export const initialState: State = {
  experiment:undefined
};

export function reducer(state = initialState, action: ExperimentAnalysisActions.ExperimentAnalysisActions): State {
  switch (action.type) {
    case ExperimentAnalysisActions.ExperimentAnalysisActionTypes.SetExperimentAnalysis:
      return handleSetExperimentAnalysis(state,action);
    default:
      return state;
  }
}

function handleSetExperimentAnalysis(state: State, action: ExperimentAnalysisActions.SetExperimentAnalysis): State {
  return {
    ...state,
    experiment: action.payload
  };
}