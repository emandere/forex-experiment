import { Action } from '@ngrx/store';
import {Session, ForexSession} from '../../models/session';
import { SessionsActionTypes, SetSessions,SessionsActions, SetForexSession } from '../actions/sessions.actions';


export interface State {
  sessions:Session[];
  forexSession:ForexSession;
}

export const initialState: State = {
  sessions:[],
  forexSession:null
};

export function reducer(state = initialState, action: SessionsActions): State {
  switch (action.type) {
    case SessionsActionTypes.SetSessions:
      return handleSetSessions(state,action);
    case SessionsActionTypes.SetForexSession:
      return handleSetForexSession(state,action);
    default:
      return state;
  }
}

function handleSetSessions(state:State,action:SetSessions):State
{
    return{
    ...state,sessions:action.payload};
}

function handleSetForexSession(state:State,action:SetForexSession):State
{
    return{
    ...state,forexSession:action.payload};
}
