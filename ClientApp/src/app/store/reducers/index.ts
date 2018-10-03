import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromIndicators from './indicators.reducer';

export interface State {

  indicators: fromIndicators.State;
  
}

export const reducers: ActionReducerMap<State> = {

  indicators: fromIndicators.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getIndicators = (state: State) => state.indicators.indicatorNames;
