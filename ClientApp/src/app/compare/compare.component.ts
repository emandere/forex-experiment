import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Experiment } from '../models/experiment';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ChartSelectEvent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

import * as fromState from '../store/reducers';
import {Variable} from '../models/experiment';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  chartWidth: number;
  experiments$: Observable<Experiment[]>;
  title:string = "PL vs Stop Loss";
  type:string ="LineChart";
  data:Array<Array<any>>;
  columnNames = ['Stop Loss','Profit'];
  options = {
    title: this.title,
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
    },
    legend: { position: 'top', maxLines: 3 },
    height: 400
  };

  public analysisChart: GoogleChartInterface = {
    chartType: this.type,
    dataTable: this.data,
    options: this.options
  };

  constructor(private store: Store<fromState.State>) { }
  
  

  ngOnInit() {
    if(window.innerWidth < 450)
    {
      this.chartWidth = 340;
    }
    else
    {
      this.chartWidth = 800;
    }
    this.experiments$ = this.store.select(fromState.getExperimentsForCompare);
    this.experiments$.subscribe(
      result => this.setupCompare(result)
    )
  }

  onSelect(event:ChartSelectEvent)
  {
      //alert(event.column);
      console.log(event.columnLabel);
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
      
      let sessionsStopLoss = experiments[0].sessions.map(session=>{
        if(session.SessionStrategy.stopLoss > 0)
          return 1 - session.SessionStrategy.stopLoss;
        else
          return session.SessionStrategy.stopLoss - 1;
      });
      
      let sessionPL = experiments.map(experiment=>experiment.sessions.map(session=>session.PL)); 
      let a = _.zip.apply(_,sessionPL);
      this.data = _.zip(sessionsStopLoss,a).map(row=>_.flatMapDeep(row));

    }
    else
    {
      xvar ="Take Profit";
      let sessionsTakeProfit = experiments[0].sessions.map(session=>{
        if(session.SessionStrategy.takeProfit > 0)
          return 1 - session.SessionStrategy.takeProfit;
        else
          return session.SessionStrategy.takeProfit - 1;
      });
      
      let sessionPL = experiments.map(experiment=>experiment.sessions.map(session=>session.PL)); 
      let a = _.zip.apply(_,sessionPL);
      this.data = _.zip(sessionsTakeProfit,a).map(row=>_.flatMapDeep(row));
    }
    let headers =  experiments.map(experiment=>experiment.name);
    headers.unshift(xvar);
    this.title = "PL vs "+xvar;
    this.columnNames = headers;
    this.options = {
      title: this.title,
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
      
      },
      legend: { position: 'top', maxLines: 3 },
      height: 400

      
    };

    

    this.data.unshift(headers);

    this.analysisChart={
      chartType: this.type,
      dataTable: this.data,
      options: this.options
    };


  }

}
