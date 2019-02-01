import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(private snackbar:MatSnackBar) { }

  ngOnInit() {
  }

  clearQueue() {
    this.snackbar.open("Experiment","result",{ duration: 5000 })
  }

}
