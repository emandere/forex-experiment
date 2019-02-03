import { Action } from '@ngrx/store';

export enum SessionsActionTypes {
  LoadSessions = '[Sessions] Load Sessions',
  SetSessions = '[Sessions] Load Sessions'
}

export class LoadSessions implements Action {
  readonly type = SessionsActionTypes.LoadSessions;
}
export class SetSessions implements Action {
  readonly type = SessionsActionTypes.SetSessions;
  constructor(public payload: string[]) {} 
}

export type SessionsActions = LoadSessions | SetSessions;
