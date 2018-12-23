import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {MatSnackBar} from '@angular/material';
import { FormControl } from '@angular/forms';


 
import * as fromState from '../store/reducers';
import * as experimentActions from '../store/actions/experiment.actions';
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
  experimentCreate:Experiment;
  indicators$: Observable<string[]>; 
  experimentSentResult$: Observable<string>; 
  positions:StrategyPosition[]=[
    {value: 'long', viewValue: 'long'},
    {value: 'short', viewValue: 'short'}
  ];
  
 
  
  constructor(private store: Store<fromState.State>,
    private indicatorService:IndicatorService,
    private http:HttpClient,
    private snackbar:MatSnackBar) { }

  ngOnInit() {
     this.store.select(fromState.getExperimentsForCreate).subscribe(
      result=> this.experimentCreate = result
    );
    this.SetIndicators();
  }

  SetIndicators() {
    //this.indicators$ = this.indicatorService.getIndicators();
    this.store.dispatch(new indicatorActions.LoadGetindicators());
    this.indicators$ = this.store.select(fromState.getIndicators);  
     
  }

  submitNewExperiment()
  {
    
    this.experimentCreate.window = this.updateVariableT(this.experimentCreate.window.displayValue,parseInt);
    this.experimentCreate.units  = this.updateVariableT(this.experimentCreate.units.displayValue,parseFloat);
    this.experimentCreate.stoploss = this.updateVariableT(this.experimentCreate.stoploss.displayValue,parseFloat);
    this.experimentCreate.takeprofit = this.updateVariableT(this.experimentCreate.takeprofit.displayValue,parseFloat);
    
  
    this.store.dispatch(new experimentActions.SendNewExperiment(this.experimentCreate));
    this.store.select(fromState.getExperimentSentResult).subscribe(
      result=>this.snackbar.open("Experiment",result,{ duration: 5000 })
    );
    this.experimentSentResult$=this.store.select(fromState.getExperimentSentResult);
     
  }


  updateVariableT(parms:string,parseFunc:(n:string)=>any)
  {
    if(parms.includes(","))
        return new Variable<number>({staticOptions:parms.split(',').map(parseFunc),min:0,max:0,increment:0});

    if(parms.includes("|"))
    {
        let args = parms.split('|');
        
        return new Variable<number>({staticOptions:[],min:parseFunc(args[0]),max:parseFunc(args[1]),increment:parseFunc(args[2])});
    }
    else
    {
        return new Variable<number>({staticOptions:[parseFunc(parms)],min:0,max:0,increment:0});
    }
  }

}
