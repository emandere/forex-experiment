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

export interface State {

  indicators: fromIndicators.State;
  experiment: fromExperiment.State;
  
}

export const reducers: ActionReducerMap<State> = {

  indicators: fromIndicators.reducer,
  experiment: fromExperiment.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getIndicators = (state: State) => state.indicators.indicatorNames;
export const getExperimentSentResult = (state:State)=>state.experiment.newExperimentResponse;
