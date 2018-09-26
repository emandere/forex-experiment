import { Component } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-project';
  
  private stateString:BehaviorSubject<string[]>;
  private indicators:string[];
 
  constructor(private http:HttpClient)
  {
   
  }
  
  ngOnInit(){
    this.SetIndicators();
  }

 
  SetIndicators()
  {
    //let state:string = this.stateString.value;
    this.http.get<string[]>('http://localhost:122/api/forexclasses/v1/rules').subscribe(result => {
      this.indicators=result
    }, error => console.error(error));    
     
  }

}
