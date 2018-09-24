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
  
  private stateString:BehaviorSubject<string> = new BehaviorSubject("Start");
 
  constructor(private http:HttpClient){}
  getState():Observable<string>{
    return this.stateString.asObservable();
  }


  changeState()
  {
    let state:string = this.stateString.value;
    this.http.get<string[]>('api/values').subscribe(result => {
      this.stateString.next(state+result[0]);
    }, error => console.error(error));

     
     
  }

}
