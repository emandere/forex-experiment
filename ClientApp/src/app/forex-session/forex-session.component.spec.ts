import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexSessionComponent } from './forex-session.component';

describe('ForexSessionComponent', () => {
  let component: ForexSessionComponent;
  let fixture: ComponentFixture<ForexSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
