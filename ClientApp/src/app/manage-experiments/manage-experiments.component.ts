import { Component, OnInit } from '@angular/core';
import {ExperimentsService} from '../services/experiments.service';
import { Experiment } from '../models/experiment';
import {Observable} from 'rxjs/Rx';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-experiments',
  templateUrl: './manage-experiments.component.html',
  styleUrls: ['./manage-experiments.component.css']
})
export class ManageExperimentsComponent implements OnInit {
  experiments$: Observable<Experiment[]>; 

  constructor(private experimentsService:ExperimentsService) { }

  ngOnInit() {
    const timer$ = interval(3000);
    this.experiments$=this.experimentsService.getExperiments();
    
  }

}
