import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import {take} from 'rxjs/operators';
import * as fromState from '../store/reducers';
import * as sessionActions from '../store/actions/sessions.actions';
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
    interval(3000).pipe(
      map(t=>{
          this.forexSession$=this.store.select(fromState.getForexSession);
          this.forexSession$.pipe(take(1)).subscribe(
              f=>{
                if(f!=null && Number(f.PercentComplete)<100){
                  this.store.dispatch(new  sessionActions.LoadForexSession(f.Id));
                }
              }
          )
        })
    ).subscribe()  
  }

}
