export class Strategy
{
    window:number;
    units:number;
    stopLoss:number;
    takeProfit:number; 
    position:string;  
}
export class Variable<T>
{
    staticOptions:T[];
    min:T;
    max:T;
    increment:T;
    displayValue?:string;
    
    constructor(
        data?:any,
        staticOptions?: T[],
        min?: T,
        max?: T,
        increment?: T
    )
    {
        Object.assign(this, data);
        this.displayValue = this.display();
    }

    display():string
    {
      if(this.staticOptions.length>0)
      {
          return this.staticOptions.toString();
      }
      else
      {
          return this.min.toString()+"|"+this.max.toString() +"|" + this.increment.toString();
      }  
    } 
    
}
export class SessionAnalysis
{
    PL:number;
    SessionStrategy:Strategy;
    Id:string;
}
export class Experiment
{
   indicator:string;
   name:string;
   startdate:string;
   enddate:string;
   position:string;
   percentcomplete?:string;
   complete?:boolean;
   startamount:number;
   window:Variable<number>;
   units:Variable<number>;
   stoploss:Variable<number>;
   takeprofit:Variable<number>;
   sessions?:SessionAnalysis[];
   elapsedtime?:string;
   constructor(data: any) {
    Object.assign(this, data);
    if(data.startamount==0)
    {
        this.startamount = 2000.0;
    }
    this.units = new Variable<number>(data.units);
    this.window = new Variable<number>(data.window);
    this.stoploss = new Variable<number>(data.stoploss);
    this.takeprofit = new Variable<number>(data.takeprofit);
   }
   
   
}

export class ExperimentsResult {
    experiments:Experiment[];
    constructor(data: any) 
    {
        Object.assign(this, data);
        //const array = data as any[];
        this.experiments = data.experiments.map(expr=>new Experiment(expr));
        //console.log(data);
    }
}

export interface StrategyPosition {
    value: string;
    viewValue: string;
}



