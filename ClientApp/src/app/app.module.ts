import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
import { CompareComponent } from './compare/compare.component';
import { QueueComponent } from './queue/queue.component';
import { SessionsEffects } from './store/effects/sessions.effects';
import { SessionComponent } from './session/session.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ForexSessionComponent } from './forex-session/forex-session.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateExperimentComponent,
    AnalysisComponent,
    ManageExperimentsComponent,
    ExperimentDetailComponent,
    CompareComponent,
    QueueComponent,
    SessionComponent,
    ForexSessionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: CreateExperimentComponent,pathMatch: 'full' },
      { path: 'analysis', component: AnalysisComponent },
      { path: 'compare',component: CompareComponent},
      { path: 'manage-experiments', component: ManageExperimentsComponent },
      { path: 'queue', component: QueueComponent },
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
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    FormsModule,
    Ng2GoogleChartsModule,
    /*GoogleChartsModule.forRoot(),*/
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([IndicatorsEffects, ExperimentEffects, SessionsEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
