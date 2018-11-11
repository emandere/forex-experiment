import { Component, OnInit,Input } from '@angular/core';
import { Experiment } from '../models/experiment';

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {
  @Input() experimentvalue:Experiment;
  experiment:Experiment;  

  constructor() { }

  ngOnInit() {
  }


}
