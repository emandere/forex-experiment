import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MatButtonModule, MatListModule } from "@angular/material";
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { CreateExperimentComponent } from './create-experiment/create-experiment.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { IndicatorsEffects } from './store/effects/indicators.effects';
import { ExperimentEffects } from './store/effects/experiment.effects';
import { AnalysisComponent } from './analysis/analysis.component';
import { ManageExperimentsComponent } from './manage-experiments/manage-experiments.component';
import { ExperimentDetailComponent } from './experiment-detail/experiment-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateExperimentComponent,
    AnalysisComponent,
    ManageExperimentsComponent,
    ExperimentDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: CreateExperimentComponent,pathMatch: 'full' },
      { path: 'analysis', component: AnalysisComponent },
      { path: 'manage-experiments', component: ManageExperimentsComponent },
      { path: 'create-experiment', component: CreateExperimentComponent }
    ]),
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([IndicatorsEffects, ExperimentEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
