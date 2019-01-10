import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable} from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as myIndndicatorActions from '../actions/getindicators.actions';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class IndicatorsEffects {

  constructor(private actions$: Actions,private http:HttpClient) {}
  @Effect()
  loadAuths$: Observable<Action> = this.actions$.pipe(
    ofType(myIndndicatorActions.GetindicatorsActionTypes.LoadGetindicators),
    switchMap(() => {
      return this.http.get<string[]>('http://192.168.1.94:122/api/forexclasses/v1/rules')
        .pipe(
          map((indicators) => {
            return new myIndndicatorActions.SetIndicators(indicators);
          })
        )
    })
  );
}
