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
  
  

  constructor( private store:Store<fromState.State>,
    private experimentsService:ExperimentsService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    
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

  resubmitExperiment()
  {
    this.store.dispatch(new experimentActions.SendCreateExperiment(this.experimentvalue));
  }


}
