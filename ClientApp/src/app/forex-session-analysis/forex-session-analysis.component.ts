import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as fromState from '../store/reducers';
import {ForexSession} from '../models/session';

@Component({
  selector: 'app-forex-session-analysis',
  templateUrl: './forex-session-analysis.component.html',
  styleUrls: ['./forex-session-analysis.component.css']
})
export class ForexSessionAnalysisComponent implements OnInit {
  forexSession$:Observable<ForexSession>;

  constructor(private store: Store<fromState.State>) { }

  ngOnInit() {
    this.forexSession$=this.store.select(fromState.getForexSession);
  }

}
