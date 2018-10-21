export class Variable
{
    staticOptions:string[];
    min:string;
    max:string;
    increment:string;
}
export class Experiment
{
   Indicator:string;
   Name:string;
   StartDate:string;
   EndDate:string;
   Position:string;
   Window:Variable;
   Units:Variable;
   StopLoss:Variable;
   TakeProfit:Variable;
   
}

export interface StrategyPosition {
    value: string;
    viewValue: string;
  }