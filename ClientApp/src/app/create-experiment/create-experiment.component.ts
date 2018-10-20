import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {MatSnackBar} from '@angular/material';
import { FormControl } from '@angular/forms';


 
import * as fromState from '../store/reducers';
import * as experimentActions from '../store/actions/submitexperiment.actions';
import * as indicatorActions from '../store/actions/getindicators.actions';
import {IndicatorService} from '../services/indicator.service'
import {Experiment} from '../models/experiment'



@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExperimentComponent implements OnInit {
  indicators$: Observable<string[]>; 
  experimentSentResult$: Observable<string>; 
  name:string='NewExperiment';
  indicator:string='';
  startdate:string='20160101';
  window:string='14';
  
 
  
  constructor(private store: Store<fromState.State>,
    private indicatorService:IndicatorService,
    private http:HttpClient,
    private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.SetIndicators();
  }

  SetIndicators() {
    //this.indicators$ = this.indicatorService.getIndicators();
    this.store.dispatch(new indicatorActions.LoadGetindicators());
    this.indicators$ = this.store.select(fromState.getIndicators);  
     
  }

  submitNewExperiment()
  {
    let experiment = new Experiment;
    experiment.Name =this.name;
    experiment.Indicator=this.indicator;
    experiment.StartDate=this.startdate;
    if(this.window.includes(","))
      experiment.Window={staticOptions:this.window.split(','),min:"",max:"",increment:""};

    if(this.window.includes("|"))
    {
        let parms = this.window.split('|');
        experiment.Window={staticOptions:[],min:parms[0],max:parms[1],increment:parms[2]};
    }   
    this.store.dispatch(new experimentActions.SendNewExperiment(experiment));//SendNewExperimentResponse
    //this.store.dispatch(new experimentActions.SendNewExperimentResponse("Testing!"));//SendNewExperimentResponse
    //this.store.dispatch(new experimentActions.SendNewExperimentResponse("Testing2!"));
    this.store.select(fromState.getExperimentSentResult).subscribe(
      result=>this.snackbar.open("Experiment",result,{ duration: 5000 })
    );
    this.experimentSentResult$=this.store.select(fromState.getExperimentSentResult);
     
  }

}
