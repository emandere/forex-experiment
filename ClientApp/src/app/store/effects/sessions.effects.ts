import { Injectable } from '@angular/core';
import { Actions, Effect,ofType } from '@ngrx/effects';
import { Observable} from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as mySessionActions from '../actions/sessions.actions';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SessionsEffects {

  constructor(private actions$: Actions,private http:HttpClient) {}


  @Effect()
  loadQueueSessions$: Observable<Action> = this.actions$.pipe(
    ofType(mySessionActions.SessionsActionTypes.LoadSessions),
    switchMap(() => {
      return this.http.get<string[]>('http://localhost:122/api/forexclasses/v1/rules')
        .pipe(
          map((indicators) => {
            return new mySessionActions.SetSessions(indicators);
          })
        )
    })
  );
}
