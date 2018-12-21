import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Experiment } from '../models/experiment';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromState from '../store/reducers';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  experiments$: Observable<Experiment[]>;
  title:string = "PL vs Stop Loss";
  type:string ="LineChart";
  data:Array<Array<any>>;
  columnNames = ['Stop Loss','Profit'];
  options = {
    hAxis:
    {
      title:"Stop Loss"
    },
    vAxis:
    {
      title:"Profit"
    },
    series: {
      1: {curveType: 'function'}
    }
  };

  constructor(private store: Store<fromState.State>) { }

  ngOnInit() {
    this.experiments$ = this.store.select(fromState.getExperimentsForCompare);
    this.experiments$.subscribe(
      result => this.setupCompare(result)
    )
  }

  setupCompare(experiments:Experiment[])
  {
    
    
    if(experiments.length == 0)
    {
      return;
    }
      
    
    let xvar:string = "Stop Loss";
    if(experiments[0].stoploss.staticOptions.length==0)
    {
      //let sessions = experiments.map(experiment=>experiment.sessions); 
      let sessionsStopLoss = experiments[0].sessions.map(session=>session.SessionStrategy.stopLoss);
      let sessionPL = experiments.map(experiment=>experiment.sessions.map(session=>session.PL)); 
      let a = _.zip.apply(_,sessionPL);
      this.data = _.zip(sessionsStopLoss,a).map(row=>_.flatMapDeep(row));
      let headers =  experiments.map(experiment=>experiment.name);
      headers.unshift(xvar);
      


    }
    else
    {
      xvar ="Take Profit";
      //this.data = this.experiment.sessions.map(sess=>[sess.SessionStrategy.takeProfit,sess.PL]); 
    }
    this.title = "PL vs "+xvar;
    this.columnNames = [xvar,'Profit'];
    this.options = {
    hAxis:
    {
      title:xvar
    },
    vAxis:
    {
      title:"Profit"
    },
    series: {
      1: {curveType: 'function'}
    }
  };


  }

}
