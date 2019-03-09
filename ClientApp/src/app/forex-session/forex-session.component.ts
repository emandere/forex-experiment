import { Component, OnInit,Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import {Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as fromState from '../store/reducers';
import {ForexSession} from '../models/session';

@Component({
  selector: 'app-forex-session',
  templateUrl: './forex-session.component.html',
  styleUrls: ['./forex-session.component.css']
})



export class ForexSessionComponent implements OnInit {
  public forexSession$:Observable<ForexSession>;
  public pLHistogramChart:SessionPLHistogramChart;
  public plHistGoogleChart: GoogleChartInterface = null;
  public balanceHistoryChart:SessionBalanceHistoryChart;
  public balanceHistoryGoogleChart: GoogleChartInterface = null;
  constructor(private store:Store<fromState.State>) { }

  ngOnInit() {
    this.forexSession$=this.store.select(fromState.getForexSession);
    this.forexSession$.subscribe(
      sess=>{
        this.setupCharts(sess);
      }
    )
  }

  setupCharts(sessionInfo:ForexSession) {
    this.pLHistogramChart=new SessionPLHistogramChart();
    this.pLHistogramChart.data = sessionInfo
                    .SessionUser
                    .Accounts
                    .Primary
                    .ClosedTrades
                    .map((trade)=>[trade.Pair+trade.OpenDate,trade.PL]);
    this.pLHistogramChart.data.unshift(["Trade","PL"]);

    this.plHistGoogleChart={
      chartType: this.pLHistogramChart.type,
      dataTable: this.pLHistogramChart.data,
      options: this.pLHistogramChart.options

    };

    this.balanceHistoryChart=new SessionBalanceHistoryChart();
    this.balanceHistoryChart.data = sessionInfo
                      .SessionUser
                      .Accounts
                      .Primary
                      .BalanceHistory
                      .map((balance)=>[balance.Date,balance.Amount]);

    this.balanceHistoryChart.data.unshift(["Date","Balance"]);
    this.balanceHistoryGoogleChart={
      chartType: this.balanceHistoryChart.type,
      dataTable: this.balanceHistoryChart.data,
      options: this.balanceHistoryChart.options
    }
  }

}

export class SessionPLHistogramChart
{
  title:string = "PL vs Stop Loss";
  type:string ="Histogram";
  data:Array<Array<any>>=null;
  columnNames = ['Stop Loss','Profit'];
  options = {
    title: this.title,
    legend: { position: 'none' },
    hAxis:
    {
      title:"Profit"
    },
    vAxis:
    {
      title:"Number of Trades"
    },
    height: 400
  };
}

export class SessionBalanceHistoryChart
{
  title:string = "Balance History Chart";
  type:string ="LineChart";
  data:Array<Array<any>>=null;
  columnNames = ['Balance','Date'];
  options = {
    title: this.title,
    legend: { position: 'none' },
    hAxis:
    {
      title:"Date"
    }, series: {
      1: {curveType: 'function'}
    
    },
    vAxis:
    {
      title:"Balance"
    },
    height: 400
  };
}