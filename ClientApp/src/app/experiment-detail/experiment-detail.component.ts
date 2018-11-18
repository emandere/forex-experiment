import { Component, OnInit,Input } from '@angular/core';
import { Experiment } from '../models/experiment';
import {ExperimentsService} from '../services/experiments.service';
import {MatSnackBar} from '@angular/material';
import {Variable} from '../models/experiment'

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: ['./experiment-detail.component.css']
})
export class ExperimentDetailComponent implements OnInit {
  @Input() experimentvalue:Experiment;
  experiment:Experiment; 
  unitsDisplay:string; 
  windowDisplay:string;

  constructor(private experimentsService:ExperimentsService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.unitsDisplay = this.display(this.experimentvalue.units);
    this.windowDisplay = this.display(this.experimentvalue.window);
  }

  display(myvar:Variable<number>)
  {
      if(myvar.staticOptions.length>0)
      {
          return myvar.staticOptions.toString();
      }
      else
      {
          return myvar.min.toString()+"|"+myvar.max.toString() +"|" + myvar.increment.toString();
      }  
  } 

 

  deleteExperiment()
  {
      this.experimentsService.deleteExperiment(this.experimentvalue.name).subscribe(
        result=>this.snackbar.open("Experiment",result,{ duration: 1000 })
      );
      this.experimentsService.updateService();
  }


}
