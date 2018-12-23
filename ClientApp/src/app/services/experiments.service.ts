import { Injectable } from '@angular/core';
import { BehaviorSubject} from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Experiment, ExperimentsResult } from '../models/experiment';
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
    return this.http.delete<string>(`/api/experiment/DeleteExperiment?name=${payload}`)
                    .pipe(
                      map((x)=>{return x}
                    ));
  }

  updateService() {
    this.http.get<ExperimentsResult>('/api/experiment/GetExperiments').subscribe(result => {

      this.indicators.next(new ExperimentsResult(result).experiments);
    }, error => console.error(error));
  }
}
