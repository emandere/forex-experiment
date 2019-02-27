import { Action } from '@ngrx/store';
import {Session, ForexSession} from '../../models/session';

export enum SessionsActionTypes {
  LoadSessions      = '[Sessions] Load Sessions',
  SetSessions       = '[Sessions] Set Sessions',
  LoadForexSession  = '[Sessions] Load Forex Session',
  SetForexSession   = '[Sessions] Set Forex Session'

}

export class LoadSessions implements Action {
  readonly type = SessionsActionTypes.LoadSessions;
}

export class LoadForexSession implements Action {
  readonly type = SessionsActionTypes.LoadForexSession;
  constructor(public payload: string) {} 
}

export class SetSessions implements Action {
  readonly type = SessionsActionTypes.SetSessions;
  constructor(public payload: Session[]) {} 
}

export class SetForexSession implements Action {
  readonly type = SessionsActionTypes.SetForexSession;
  constructor(public payload: ForexSession) {} 
}

export type SessionsActions = LoadSessions | SetSessions | LoadForexSession | SetForexSession;
