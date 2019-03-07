import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartSelectEvent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { Router } from '@angular/router';


import { Experiment } from '../models/experiment';
import * as fromState from '../store/reducers';
import * as sessionActions from '../store/actions/sessions.actions';

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
    title:"Analysis",
    legend: 'none',
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

  public analysisChart: GoogleChartInterface = {
    chartType: this.type,
    dataTable: this.data,
    options: this.options
  };

  constructor(private store: Store<fromState.State>,private router:Router) 
  {

  }

  ngOnInit() {
    
    this.store.select(fromState.getExperimentAnalysis).subscribe(
      result=>this.setupAnalysis(result)
    );
    
  }

  normalize(x:number):number
  {
     if(x>0){
        return 1 - x;
     } else {
       return x - 1;
     }
  }

  setupAnalysis(result:Experiment)
  {
    
    this.experiment = result;
    if(result==undefined)
    {
      return;
    }
      
    
    let xvar:string = "Stop Loss";
    if(this.experiment.stoploss.staticOptions.length==0)
    {

      this.data = this.experiment.sessions.map(sess=>[this.normalize(sess.SessionStrategy.stopLoss),sess.PL]);

    }
    else
    {
      xvar ="Take Profit";
      this.data = this.experiment.sessions.map(sess=>[this.normalize(sess.SessionStrategy.takeProfit),sess.PL]); 
    }
    this.title = "PL vs "+xvar;
    this.columnNames = [xvar,'Profit'];
    this.options = {
      title: this.title,
      legend: 'none',
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

    this.data.unshift([xvar,"Profit"]);

    this.analysisChart={
      chartType: this.type,
      dataTable: this.data,
      options: this.options
    };
  }

  onSelect(event:ChartSelectEvent)
  {
      //alert(event.column);
      console.log(event.selectedRowValues);
      this.findSession(event);
      this.router.navigate(['/session-analysis']);
  }

  findSession(event:ChartSelectEvent)
  {
      let session = this.experiment.sessions.find(x=>x.PL==event.selectedRowValues[1]);
      console.log(session.Id);
      this.store.dispatch(new sessionActions.LoadForexSession(session.Id));
      
  }


}
