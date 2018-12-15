import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Experiment } from '../models/experiment';
import * as fromState from '../store/reducers';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  experiment:Experiment;

  constructor(private store: Store<fromState.State>) 
  {

  }

  ngOnInit() {
    this.store.select(fromState.getExperimentAnalysis).subscribe(
      result=>this.experiment=result
    );
  }

}
