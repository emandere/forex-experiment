import { Action } from '@ngrx/store';
import { ExperimentActions, ExperimentActionTypes,SendNewExperimentResponse,SelectExperimentForComparison } from '../actions/experiment.actions';
import { Experiment } from 'src/app/models/experiment';


export interface State {
  newExperimentResponse:string;
  experimentsCompare:Experiment[];
}

export const initialState: State = {
  newExperimentResponse:"",
  experimentsCompare:[]
};

export function reducer(state = initialState, action: ExperimentActions): State {
  switch (action.type) {
    case ExperimentActionTypes.SendNewExperimentResponse:
      return handleSetExperimentResponse(state,action);
    case ExperimentActionTypes.SelectExperimentForComparison:
      return handleSelectExperimentForComparison(state,action);
    default:
      return state;
  }
}

function handleSetExperimentResponse(state: State, action:SendNewExperimentResponse ): State {
  return {
    ...state,
    newExperimentResponse: action.payload
  };
}

function handleSelectExperimentForComparison(state: State, action:SelectExperimentForComparison ): State {
  state.experimentsCompare.push(action.payload);
  return state;
}
