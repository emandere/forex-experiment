import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendNewExperiment, SetExperiments, ExperimentActionTypes, SendNewExperimentResponse } from '../actions/experiment.actions';
import { map } from 'rxjs/operators';
import { Send } from 'express-serve-static-core';
import { Experiment,ExperimentsResult } from 'src/app/models/experiment';


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
    ofType(ExperimentActionTypes.SendNewExperiment),
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

  @Effect()
  loadExperiments$: Observable<Action> = this.actions$.pipe(
    ofType(ExperimentActionTypes.LoadExperiments),
    switchMap(() => {
      return this.http.get<ExperimentsResult>('/api/experiment/GetExperiments')
        .pipe(
          map((experimentResult) => {
            return new SetExperiments(new ExperimentsResult(experimentResult).experiments);
          })
        )
    })
  );
  
}
