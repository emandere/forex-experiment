import { Action } from '@ngrx/store';
import { SessionsActionTypes, SetSessions,SessionsActions } from '../actions/sessions.actions';


export interface State {
  sessions:string[];
}

export const initialState: State = {
  sessions:["hello","world"]
};

export function reducer(state = initialState, action: SessionsActions): State {
  switch (action.type) {
    case SessionsActionTypes.SetSessions:
      return handleSetSessions(state,action);
    default:
      return state;
  }
}

function handleSetSessions(state:State,action:SetSessions):State
{
    return{
    ...state,sessions:action.payload};
}
