import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromIndicators from './indicators.reducer';
import * as fromExperiment from './experiment.reducer';
import * as fromExperimentAnalysis from './experimentAnalysis.reducer';


export interface State {

  indicators: fromIndicators.State;
  experiment: fromExperiment.State;
  experimentAnalysis:fromExperimentAnalysis.State;
  
}

export const reducers: ActionReducerMap<State> = {

  indicators: fromIndicators.reducer,
  experiment: fromExperiment.reducer,
  experimentAnalysis:fromExperimentAnalysis.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getIndicators = (state: State) => state.indicators.indicatorNames;
export const getExperimentSentResult = (state:State)=>state.experiment.newExperimentResponse;
export const getExperimentAnalysis = (state:State) => state.experimentAnalysis.experiment;
export const getExperimentsForCompare = (state:State) => state.experiment.experimentsCompare;
