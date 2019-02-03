import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SessionsEffects } from './sessions.effects';

describe('SessionsEffects', () => {
  let actions$: Observable<any>;
  let effects: SessionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(SessionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
