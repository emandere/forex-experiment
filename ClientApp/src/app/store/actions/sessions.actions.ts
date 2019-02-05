import { Action } from '@ngrx/store';
import {Session} from '../../models/session';

export enum SessionsActionTypes {
  LoadSessions = '[Sessions] Load Sessions',
  SetSessions = '[Sessions] Set Sessions'
}

export class LoadSessions implements Action {
  readonly type = SessionsActionTypes.LoadSessions;
}
export class SetSessions implements Action {
  readonly type = SessionsActionTypes.SetSessions;
  constructor(public payload: Session[]) {} 
}

export type SessionsActions = LoadSessions | SetSessions;
