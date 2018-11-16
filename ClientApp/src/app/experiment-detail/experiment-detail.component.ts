import { Component, OnInit,Input } from '@angular/core';
import { Experiment } from '../models/experiment';
import {ExperimentsService} from '../services/experiments.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {
  @Input() experimentvalue:Experiment;
  experiment:Experiment;  

  constructor(private experimentsService:ExperimentsService,private snackbar:MatSnackBar) { }

  ngOnInit() {
  }

 

  deleteExperiment()
  {
      this.experimentsService.deleteExperiment(this.experimentvalue.name).subscribe(
        result=>this.snackbar.open("Experiment",result,{ duration: 1000 })
      );
      this.experimentsService.updateService();
  }


}
