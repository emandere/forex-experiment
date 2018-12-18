import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Experiment } from '../models/experiment';
import * as fromState from '../store/reducers';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  
  experiment:Experiment;
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

  constructor(private store: Store<fromState.State>) 
  {

  }

  ngOnInit() {
    
    this.store.select(fromState.getExperimentAnalysis).subscribe(
      result=>this.setupAnalysis(result)
    );
    
  }

  setupAnalysis(result:Experiment)
  {
    this.experiment = result;
    let xvar:string = "Stop Loss";
    if(this.experiment.stoploss.staticOptions.length==0)
    {
      this.data = this.experiment.sessions.map(sess=>[sess.SessionStrategy.stopLoss,sess.PL]);

    }
    else
    {
      xvar ="Take Profit";
      this.data = this.experiment.sessions.map(sess=>[sess.SessionStrategy.takeProfit,sess.PL]); 
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
