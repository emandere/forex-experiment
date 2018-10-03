import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
 
import * as fromState from '../store/reducers';
import * as experimentActions from '../store/actions/submitexperiment.actions';
import * as indicatorActions from '../store/actions/getindicators.actions';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExperimentComponent implements OnInit {
  indicators$: Observable<string[]>; 

  constructor(private store: Store<fromState.State>,private http:HttpClient) { }

  ngOnInit() {
    this.SetIndicators();
  }

  SetIndicators() {

    this.store.dispatch(new indicatorActions.LoadGetindicators());
    this.indicators$ = this.store.select(fromState.getIndicators)
    /*this.http.get<string[]>('http://localhost:122/api/forexclasses/v1/rules').subscribe(result => {
      this.indicators=result
    }, error => console.error(error));*/    
     
  }

}
