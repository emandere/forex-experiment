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
    case indicatorActions.GetindicatorsActionTypes.LoadGetindicators:
      return handleLoadIndicators(state,action);
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
