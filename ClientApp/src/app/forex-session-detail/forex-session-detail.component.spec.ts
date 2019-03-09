import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexSessionDetailComponent } from './forex-session-detail.component';

describe('ForexSessionDetailComponent', () => {
  let component: ForexSessionDetailComponent;
  let fixture: ComponentFixture<ForexSessionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexSessionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexSessionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
