import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  private indicators:BehaviorSubject<string[]> = new BehaviorSubject([]);
  constructor(private http:HttpClient) {
    this.updateService();
   }
  getIndicators():Observable<string[]>{
      
      return this.indicators.asObservable();
  }

  updateService() {
    this.http.get<string[]>('http://localhost:122/api/forexclasses/v1/rules').subscribe(result => {
      this.indicators.next(result);
    }, error => console.error(error));
  }
}
