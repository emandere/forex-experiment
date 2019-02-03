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
import { Experiment } from 'src/app/models/experiment';
import * as fromSessions from './sessions.reducer';


export interface State {

  indicators: fromIndicators.State;
  experiment: fromExperiment.State;
  experimentAnalysis:fromExperimentAnalysis.State;
  sessions: fromSessions.State;

  
}

export const reducers: ActionReducerMap<State> = {

  indicators: fromIndicators.reducer,
  experiment: fromExperiment.reducer,
  experimentAnalysis:fromExperimentAnalysis.reducer,
  sessions: fromSessions.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getIndicators = (state: State) => state.indicators.indicatorNames;
export const getExperimentSentResult = (state:State)=>state.experiment.newExperimentResponse;
export const getExperimentAnalysis = (state:State) => state.experiment
                                                            .experimentsManage
                                                            .find(x=>x.name==state.experimentAnalysis.experiment);
                                                            
export const getExperimentsForCompare = (state:State) => state.experiment
                                                              .experimentsManage
                                                              .filter( 
                                                                  experiment=>state.experiment
                                                                          .experimentsCompare
                                                                          .some(x=>x===experiment.name)
                                                                );
export const getExperimentsForCreate = (state:State) => state.experiment.experimentCreate;
export const getExperimentsForManage = (state:State) => state.experiment.experimentsManage;
export const getSessions = (state:State) => state.sessions.sessions;