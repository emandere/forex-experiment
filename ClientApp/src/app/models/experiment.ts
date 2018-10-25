export class Variable<T>
{
    staticOptions:T[];
    min:T;
    max:T;
    increment:T;
}
export class Experiment
{
   Indicator:string;
   Name:string;
   StartDate:string;
   EndDate:string;
   Position:string;
   Window:Variable<number>;
   Units:Variable<number>;
   StopLoss:Variable<number>;
   TakeProfit:Variable<number>;
   
}

export interface StrategyPosition {
    value: string;
    viewValue: string;
  }