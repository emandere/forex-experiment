export class Strategy
{
    window:Variable<number>;
    units:Variable<number>;
    stoploss:Variable<number>;
    takeprofit:Variable<number>; 
    position:string;  
}
export class Variable<T>
{
    staticOptions:T[];
    min:T;
    max:T;
    increment:T;
    display:string;
    constructor(
        staticOptions: T[],
        min: T,
        max: T,
        increment: T,
    )
    {
        this.staticOptions = staticOptions;
        this.min = min;
        this.max = max;
        this.increment = increment;
    }
    
}
export class SessionAnalysis
{
    PL:number;
    SessionStrategy:Strategy;
}
export class Experiment
{
   indicator:string;
   name:string;
   startdate:string;
   enddate:string;
   position:string;
   percentcomplete:string;
   complete:boolean;
   startamount:number;
   window:Variable<number>;
   units:Variable<number>;
   stoploss:Variable<number>;
   takeprofit:Variable<number>;
   sessions:SessionAnalysis[];
   constructor(){}
   
   
}

export class ExperimentsResult {
    experiments:Experiment[];
}

export interface StrategyPosition {
    value: string;
    viewValue: string;
}



