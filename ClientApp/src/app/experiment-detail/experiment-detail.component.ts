import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Experiment } from '../models/experiment';
import {ExperimentsService} from '../services/experiments.service';
import {MatSnackBar} from '@angular/material';
import {Variable} from '../models/experiment';
import * as fromState from '../store/reducers';

import * as experimentAnalysisActions from '../store/actions/experimentAnalysis.actions';
import * as experimentActions from '../store/actions/experiment.actions';

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {
  @Input() experimentvalue:Experiment;
  experiment:Experiment; 
  unitsDisplay:string; 
  windowDisplay:string;
  stopLossDisplay:string;
  takeProfitDisplay:string;

  constructor( private store:Store<fromState.State>,
    private experimentsService:ExperimentsService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.unitsDisplay = this.display(this.experimentvalue.units);
    this.windowDisplay = this.display(this.experimentvalue.window);
    this.stopLossDisplay = this.display(this.experimentvalue.stoploss);
    this.takeProfitDisplay = this.display(this.experimentvalue.takeprofit);
  }

  display(myvar:Variable<number>)
  {
      if(myvar.staticOptions.length>0)
      {
          return myvar.staticOptions.toString();
      }
      else
      {
          return myvar.min.toString()+"|"+myvar.max.toString() +"|" + myvar.increment.toString();
      }  
  } 

 

  deleteExperiment()
  {
      this.experimentsService.deleteExperiment(this.experimentvalue.name).subscribe(
        result=>this.snackbar.open("Experiment",result,{ duration: 1000 })
      );
      this.experimentsService.updateService();
  }

  analyzeExperiment()
  {
    this.store.dispatch(new experimentAnalysisActions.SetExperimentAnalysis(this.experimentvalue));
  }

  compareExperiment()
  {
    this.store.dispatch(new experimentActions.SelectExperimentForComparison(this.experimentvalue));
  }


}
