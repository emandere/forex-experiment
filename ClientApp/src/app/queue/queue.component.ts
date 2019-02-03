import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromState from '../store/reducers';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  sessions$: Observable<string[]>; 
  constructor( private snackbar:MatSnackBar,
               private store: Store<fromState.State>) {

  }

  ngOnInit() {
    this.sessions$=this.store.select(fromState.getSessions);
  }

  clearQueue() {
    this.snackbar.open("Experiment","result",{ duration: 5000 })
  }

}
