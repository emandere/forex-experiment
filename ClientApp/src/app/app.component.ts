import { Component } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-project';
  private stateString:BehaviorSubject<string> = new BehaviorSubject("Start yyyy");

  getState():Observable<string>{
    return this.stateString.asObservable();
  }

  changeState()
  {
     let state:string = this.stateString.value;
     this.stateString.next(state+"qqq");
  }

}
