import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Experiment } from '../models/experiment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  private indicators:BehaviorSubject<Experiment[]> = new BehaviorSubject([]);
  constructor(private http:HttpClient) {
    this.updateService();
   }
  getExperiments():Observable<Experiment[]>{
      //this.updateService();
      return this.indicators.asObservable();
  }

  setOptions()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return httpOptions;
  }

  deleteExperiment(payload:string):Observable<string>
  {
    return this.http.post<string>('/api/values/DeleteExperiment',JSON.stringify(payload),this.setOptions())
                    .pipe(
                      map((x)=>{return x}
                    ));
  }

  updateService() {
    this.http.get<Experiment[]>('/api/values/GetExperiments').subscribe(result => {
      this.indicators.next(result);
    }, error => console.error(error));
  }
}
