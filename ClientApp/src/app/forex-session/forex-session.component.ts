import { Component, OnInit,Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import {Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as fromState from '../store/reducers';
import {ForexSession, Trade} from '../models/session';

@Component({
  selector: 'app-forex-session',
  templateUrl: './forex-session.component.html',
  styleUrls: ['./forex-session.component.css']
})



export class ForexSessionComponent implements OnInit {
  public forexSession$:             Observable<ForexSession>;
  public pLHistogramChart:          SessionPLHistogramChart;
  public pLByPairHistogramChart:    SessionPLByPairHistogramChart;
  public lengthHistogram:           SessionTradeLengthHistogramChart;
  public plHistGoogleChart:         GoogleChartInterface = null;
  public plByPairHistGoogleChart:   GoogleChartInterface = null;
  public lengthHistGoogleChart:     GoogleChartInterface = null;
  public balanceHistoryChart:       SessionBalanceHistoryChart;
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

  dateDiff(trade:Trade):number
  {
    let openDate:Date = new Date(trade.OpenDate);
    let closeDate:Date = new Date(trade.CloseDate);

    let diff:number = Math.abs(openDate.getTime() - closeDate.getTime());
    let diffDays:number = Math.ceil(diff / (1000 * 3600 * 24));         

    return diffDays;

  }

  sumPL(pair:string,trades:Trade[]):number
  {
      return trades.filter(trade=>trade.Pair==pair)
                    .map(trade=>trade.PL)
                    .reduce((acc,pl)=>acc+pl);
  }

  uniquePairs(trades:Trade[]):string[]
  {
     let setvalues = new Set(trades.map(trade=>trade.Pair)).values();
     return Array.from(setvalues);
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


    this.lengthHistogram=new SessionTradeLengthHistogramChart();
    this.lengthHistogram.data = sessionInfo
                    .SessionUser
                    .Accounts
                    .Primary
                    .ClosedTrades
                    .map((trade)=>[trade.Pair+trade.OpenDate,this.dateDiff(trade)]);
    this.lengthHistogram.data.unshift(["Trade","Days"]);

    this.lengthHistGoogleChart={
      chartType: this.lengthHistogram.type,
      dataTable: this.lengthHistogram.data,
      options: this.lengthHistogram.options

    };


    let closedTrades =sessionInfo
                      .SessionUser
                      .Accounts
                      .Primary
                      .ClosedTrades;
    this.pLByPairHistogramChart=new  SessionPLByPairHistogramChart();
    this.pLByPairHistogramChart.data = this.uniquePairs(closedTrades)
                    .map((pair)=>[pair,this.sumPL(pair,closedTrades)]);
    this.pLByPairHistogramChart.data.unshift(["PL","Pairs"]);

    this.plByPairHistGoogleChart={
      chartType: this.pLByPairHistogramChart.type,
      dataTable: this.pLByPairHistogramChart.data,
      options: this.pLByPairHistogramChart.options

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


export class SessionPLByPairHistogramChart
{
  title:string = "PL vs Pair";
  type:string ="Bar";
  data:Array<Array<any>>=null;
  columnNames = ['Pair','Stop Loss'];
  options = {
    title: this.title,
    legend: { position: 'none' },
    hAxis:
    {
      title:"Pairs"
    },
    vAxis:
    {
      title:"PL"
    },
    height: 400
  };
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

export class SessionTradeLengthHistogramChart
{
  title:string = "Trade duration";
  type:string ="Histogram";
  data:Array<Array<any>>=null;
  columnNames = ['Stop Loss','Profit'];
  options = {
    title: this.title,
    legend: { position: 'none' },
    hAxis:
    {
      title:"# of Trades"
    },
    vAxis:
    {
      title:"days"
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