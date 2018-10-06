import { Action } from '@ngrx/store';
import * as indicatorActions from '../actions/getindicators.actions';

export interface State {
  indicatorNames:string[];
}



export const initialState: State = {
  indicatorNames:[]
};

export function reducer(state = initialState, action: indicatorActions.IndicatorActions): State {
  switch (action.type) {
    case indicatorActions.GetindicatorsActionTypes.SetIndicators:
      return handleSetIndicators(state,action);
    default:
      return state;
  }
}

function handleLoadIndicators(state: State, action: indicatorActions.LoadGetindicators): State {
  return {
    ...state,
    indicatorNames: ["hello","world"]
  };
}

function handleSetIndicators(state: State, action: indicatorActions.SetIndicators): State {
  return {
    ...state,
    indicatorNames: action.payload
  };
}
