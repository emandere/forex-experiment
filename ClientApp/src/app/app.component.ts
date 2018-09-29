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
  
  
 
  constructor(private http:HttpClient)
  {
   
  }
  
  ngOnInit(){
    
  }

 
  

}
