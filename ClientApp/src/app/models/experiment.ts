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
   Window:Variable;
}