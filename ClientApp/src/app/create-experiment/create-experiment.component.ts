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
import {Experiment, Variable, StrategyPosition} from '../models/experiment'



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
  enddate:string='20170101';
  window:string='14';
  units:string='2000';
  stoploss:string='1.0';
  takeprofit:string='1.0';
  position:string='';
  positions:StrategyPosition[]=[
    {value: 'long', viewValue: 'long'},
    {value: 'short', viewValue: 'short'}
  ];
  
 
  
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
    experiment.EndDate=this.enddate;
    experiment.Position = this.position;
    experiment.Window = this.updateVariable(this.window);
    experiment.Units = this.updateVariable(this.units);
    experiment.StopLoss = this.updateVariable(this.stoploss);
    experiment.TakeProfit = this.updateVariable(this.takeprofit);
    
    this.store.dispatch(new experimentActions.SendNewExperiment(experiment));
    this.store.select(fromState.getExperimentSentResult).subscribe(
      result=>this.snackbar.open("Experiment",result,{ duration: 5000 })
    );
    this.experimentSentResult$=this.store.select(fromState.getExperimentSentResult);
     
  }

  updateVariable(parms:string)
  {
    if(parms.includes(","))
        return {staticOptions:parms.split(','),min:"",max:"",increment:""};

    if(parms.includes("|"))
    {
        let args = parms.split('|');
        return {staticOptions:[],min:args[0],max:args[1],increment:args[2]};
    }
    else
    {
        return {staticOptions:[parms],min:"",max:"",increment:""};
    }
  }

}
