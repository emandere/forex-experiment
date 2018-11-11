export class Variable<T>
{
    staticOptions:T[];
    min:T;
    max:T;
    increment:T;
}
export class Experiment
{
   indicator:string;
   name:string;
   startdate:string;
   enddate:string;
   position:string;
   startamount:number;
   window:Variable<number>;
   units:Variable<number>;
   stoploss:Variable<number>;
   takeprofit:Variable<number>;
   
}

export interface StrategyPosition {
    value: string;
    viewValue: string;
  }