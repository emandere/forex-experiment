import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

 
import * as fromState from '../store/reducers';
import * as experimentActions from '../store/actions/submitexperiment.actions';
import * as indicatorActions from '../store/actions/getindicators.actions';
import {IndicatorService} from '../services/indicator.service'

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExperimentComponent implements OnInit {
  indicators$: Observable<string[]>; 

  constructor(private store: Store<fromState.State>,
    private indicatorService:IndicatorService,
    private http:HttpClient) { }

  ngOnInit() {
    this.SetIndicators();
  }

  SetIndicators() {
    this.indicators$ = this.indicatorService.getIndicators();
       
     
  }

}
