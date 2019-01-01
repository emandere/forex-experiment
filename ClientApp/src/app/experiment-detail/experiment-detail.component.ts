import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
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
  experimentsToCompare$:Observable<Experiment[]>;
  isComparing:string="";
  compareButton:string="Compare";


  

  constructor( private store:Store<fromState.State>,
    private experimentsService:ExperimentsService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.experimentsToCompare$ = this.store.select(fromState.getExperimentsForCompare);
    this.experimentsToCompare$.subscribe(
      compareExperiments=>
      {
        if(compareExperiments.some(x=>x.name==this.experimentvalue.name))
        {
           this.isComparing = "comparing";
           this.compareButton = "De-Compare"
        }
        else
        {
           this.isComparing = "";
           this.compareButton = "Compare"
        }
      }
    )
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
    this.store.dispatch(new experimentAnalysisActions.SetExperimentAnalysis(this.experimentvalue.name));
  }

  compareExperiment()
  {
    if(this.isComparing=="")
    {
      this.store.dispatch(new experimentActions.SelectExperimentForComparison(this.experimentvalue.name));
    }
    else{
      this.store.dispatch(new experimentActions.RemoveExperimentForComparison(this.experimentvalue.name));
    }
  }

  resubmitExperiment()
  {
    this.store.dispatch(new experimentActions.SendCreateExperiment(this.experimentvalue));
  }


}
