import { Action } from '@ngrx/store';
import { ExperimentActions, ExperimentActionTypes,SendNewExperimentResponse,SelectExperimentForComparison, SendCreateExperiment, SetExperiments } from '../actions/experiment.actions';
import { Experiment,Variable } from 'src/app/models/experiment';


export interface State {
  newExperimentResponse:string;
  experimentsCompare:Experiment[];
  experimentCreate:Experiment;
  experimentsManage:Experiment[]
}

export const initialState: State = {
  newExperimentResponse:"",
  experimentsCompare:[],
  experimentsManage:[],
  experimentCreate:{
    name:"NewExperimentState",
    indicator:"RSIOverbought70",
    startamount:2000,
    startdate:"20170601",
    enddate:"20171101",
    position:"short",
    window:new Variable<number>({staticOptions:[14]}),
    units:new Variable<number>({staticOptions:[2000]}),
    stoploss:new Variable<number>({staticOptions:[1.007]}),
    takeprofit:new Variable<number>({staticOptions:[0.993]})
  }
};

export function reducer(state = initialState, action: ExperimentActions): State {
  switch (action.type) {
    case ExperimentActionTypes.SendNewExperimentResponse:
      return handleSetExperimentResponse(state,action);
    case ExperimentActionTypes.SelectExperimentForComparison:
      return handleSelectExperimentForComparison(state,action);
    case ExperimentActionTypes.SendCreateExperiment:
      return handleSendCreateExperiment(state,action);
    case ExperimentActionTypes.SetExperiments:
      return handleSetExperiments(state,action)
    default:
      return state;
  }
}

function handleSetExperimentResponse(state: State, action:SendNewExperimentResponse ): State {
  return {
    ...state,
    newExperimentResponse: action.payload
  };
}

function handleSendCreateExperiment(state: State, action:SendCreateExperiment ): State {
  return {
    ...state,
    experimentCreate: action.payload
  };
}

function handleSelectExperimentForComparison(state: State, action:SelectExperimentForComparison ): State {
  //state.experimentsCompare.push(action.payload);
  //return state;
  return {
    ...state,
    experimentsCompare:[...state.experimentsCompare,action.payload]
  }
}

function  handleSetExperiments(state:State,action:SetExperiments):State
{
  return {
    ...state,
    experimentsManage:action.payload
  }
}
