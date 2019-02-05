import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import * as fromState from '../store/reducers';
import * as fromSessionActions from '../store/actions/sessions.actions';
import { Session } from '../models/session';
@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  sessions$: Observable<Session[]>; 
  constructor( private snackbar:MatSnackBar,
               private store: Store<fromState.State>) {

  }

  ngOnInit() {
    this.store.dispatch(new fromSessionActions.LoadSessions());
    //this.store.dispatch(new fromSessionActions.SetSessions(["Hi"]));
    this.sessions$=this.store.select(fromState.getSessions);
  }

  clearQueue() {
    this.snackbar.open("Experiment","result",{ duration: 5000 })
  }

}
