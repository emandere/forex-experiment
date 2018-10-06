import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { IndicatorsEffects } from './indicators.effects';

describe('IndicatorsEffects', () => {
  let actions$: Observable<any>;
  let effects: IndicatorsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IndicatorsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(IndicatorsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
