import { Component, OnInit,Input } from '@angular/core';
import { ForexSession } from '../models/session';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-forex-session',
  templateUrl: './forex-session.component.html',
  styleUrls: ['./forex-session.component.css']
})
export class ForexSessionComponent implements OnInit {
  @Input() sessionInfo:ForexSession;
  title:string = "PL vs Stop Loss";
  type:string ="Histogram";
  data:Array<Array<any>>;
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

  public analysisChart: GoogleChartInterface = {
    chartType: this.type,
    dataTable: this.data,
    options: this.options
  };
  constructor() { }

  ngOnInit() {

    this.data = this.sessionInfo
                    .SessionUser
                    .Accounts
                    .Primary
                    .ClosedTrades
                    .map((trade)=>[trade.Pair+trade.OpenDate,trade.PL]);
    this.data.unshift(["Trade","PL"]);

    this.analysisChart={
      chartType: this.type,
      dataTable:this.data,
      options:this.options

    };

  }

}
