import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-experiment',
  templateUrl: './create-experiment.component.html',
  styleUrls: ['./create-experiment.component.css']
})
export class CreateExperimentComponent implements OnInit {
  private indicators:string[];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.SetIndicators();
  }

  SetIndicators()
  {
    this.http.get<string[]>('http://localhost:122/api/forexclasses/v1/rules').subscribe(result => {
      this.indicators=result
    }, error => console.error(error));    
     
  }

}
