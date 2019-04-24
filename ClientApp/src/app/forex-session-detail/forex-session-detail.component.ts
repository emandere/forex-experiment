import { Component, OnChanges,Input } from '@angular/core';
import {ForexSession} from '../models/session';

@Component({
  selector: 'app-forex-session-detail',
  templateUrl: './forex-session-detail.component.html',
  styleUrls: ['./forex-session-detail.component.css']
})
export class ForexSessionDetailComponent implements OnChanges {
  @Input() sessionInfo:ForexSession;
  percentProfitable:number;
  closedTrades:number;
  constructor() { }

  ngOnChanges() {
    let numProfitable:number = this.sessionInfo
                                 .SessionUser
                                 .Accounts
                                 .Primary
                                 .ClosedTrades
                                 .filter((trade)=>trade.PL > 0)
                                 .length;

    this.closedTrades = this.sessionInfo
                          .SessionUser
                          .Accounts
                          .Primary
                          .ClosedTrades
                          .length;
    this.percentProfitable = ( numProfitable / this.closedTrades ) * 100;
  }

}
