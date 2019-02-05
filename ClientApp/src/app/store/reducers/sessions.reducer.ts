import { Action } from '@ngrx/store';
import {Session} from '../../models/session';
import { SessionsActionTypes, SetSessions,SessionsActions } from '../actions/sessions.actions';


export interface State {
  sessions:Session[];
}

export const initialState: State = {
  sessions:[]
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
