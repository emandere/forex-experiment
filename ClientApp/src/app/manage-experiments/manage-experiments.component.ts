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
    interval(3000).pipe(
      map(t=>this.experimentsService.updateService())
    ).subscribe();
    this.experiments$=this.experimentsService.getExperiments();
    
  }

}
