import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexSessionAnalysisComponent } from './forex-session-analysis.component';

describe('ForexSessionAnalysisComponent', () => {
  let component: ForexSessionAnalysisComponent;
  let fixture: ComponentFixture<ForexSessionAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexSessionAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexSessionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
