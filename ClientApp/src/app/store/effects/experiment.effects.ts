import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendNewExperiment, SubmitexperimentActionTypes, SendNewExperimentResponse } from '../actions/submitexperiment.actions';
import { map } from 'rxjs/operators';
import { Send } from 'express-serve-static-core';


@Injectable()
export class ExperimentEffects {

  constructor(private actions$: Actions,private http:HttpClient) {}
  setOptions()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return httpOptions;
  }
  @Effect()
  
  loadAuths$: Observable<Action> = this.actions$.pipe(
    ofType(SubmitexperimentActionTypes.SendNewExperiment),
    map((action: SendNewExperiment) => action.payload),
    switchMap(payload => {
      return this.http.post<string>('api/experiment/CreateExperiment',JSON.stringify(payload),this.setOptions())
        .pipe(
          map((response) => {
            return new SendNewExperimentResponse(JSON.stringify(response));
          })
        )
    })
  );
  
}
