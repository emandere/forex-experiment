import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Experiment } from '../models/experiment';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  private indicators:BehaviorSubject<Experiment[]> = new BehaviorSubject([]);
  constructor(private http:HttpClient) {
   
   }
  getExperiments():Observable<Experiment[]>{
      this.updateService();
      return this.indicators.asObservable();
  }

  updateService() {
    this.http.get<Experiment[]>('/api/values/GetExperiments').subscribe(result => {
      this.indicators.next(result);
    }, error => console.error(error));
  }
}
