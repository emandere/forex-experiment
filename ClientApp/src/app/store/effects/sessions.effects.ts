import { Injectable } from '@angular/core';
import { Actions, Effect,ofType } from '@ngrx/effects';
import { Observable} from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as mySessionActions from '../actions/sessions.actions';
import { HttpClient } from '@angular/common/http';
import {SessionResult,Session, ForexSessionResult} from '../../models/session';

@Injectable()
export class SessionsEffects {

  constructor(private actions$: Actions,private http:HttpClient) {}


  @Effect()
  loadQueueSessions$: Observable<Action> = this.actions$.pipe(
    ofType(mySessionActions.SessionsActionTypes.LoadSessions),
    switchMap(() => {
      return this.http.get<SessionResult>('/api/sessionqueue/GetQueuedSessions')
        .pipe(
          map((sessionResult) => {
            return new mySessionActions.SetSessions(sessionResult.sessions);
          })
        )
    })
  );

  @Effect()
  loadForexSession$: Observable<Action> = this.actions$.pipe(
    ofType(mySessionActions.SessionsActionTypes.LoadForexSession),
    map((action: mySessionActions.LoadForexSession) => action.payload),
    switchMap((payload) => {
      return this.http.get<ForexSessionResult>(`/api/session/GetSession/${payload}`)
        .pipe(
          map((forexResult)=>{
            return new mySessionActions.SetForexSession(forexResult.session);
          })
        )
    })
  );
}
