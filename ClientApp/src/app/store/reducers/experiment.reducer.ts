import { Action } from '@ngrx/store';
import { SendNewExperimentResponse, SubmitexperimentActionTypes } from '../actions/submitexperiment.actions';


export interface State {
  newExperimentResponse:string;
}

export const initialState: State = {
  newExperimentResponse:""
};

export function reducer(state = initialState, action: SendNewExperimentResponse): State {
  switch (action.type) {
    case SubmitexperimentActionTypes.SendNewExperimentResponse:
      return handleSetExperimentResponse(state,action);
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
