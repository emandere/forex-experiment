import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExperimentEffects } from './experiment.effects';

describe('ExperimentEffects', () => {
  let actions$: Observable<any>;
  let effects: ExperimentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExperimentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ExperimentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
