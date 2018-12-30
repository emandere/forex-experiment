import { Component, OnInit } from '@angular/core';
import {ExperimentsService} from '../services/experiments.service';
import { Experiment } from '../models/experiment';
import {Observable} from 'rxjs/Rx';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromState from '../store/reducers';
import * as experimentActions from '../store/actions/experiment.actions';

@Component({
  selector: 'app-manage-experiments',
  templateUrl: './manage-experiments.component.html',
  styleUrls: ['./manage-experiments.component.css']
})
export class ManageExperimentsComponent implements OnInit {
  experiments$: Observable<Experiment[]>; 

  constructor(private store: Store<fromState.State>,private experimentsService:ExperimentsService) { }

  ngOnInit() {
    interval(3000).pipe(
      map(t=>this.store.dispatch(new  experimentActions.LoadExperiments()))
    ).subscribe();
    this.experiments$=this.store.select(fromState.getExperimentsForManage);//this.experimentsService.getExperiments();

    //this.store.dispatch(new indicatorActions.LoadGetindicators());
    //this.indicators$ = this.store.select(fromState.getIndicators); 
    
  }

}
