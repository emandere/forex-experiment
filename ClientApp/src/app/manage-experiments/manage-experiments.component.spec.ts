import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExperimentsComponent } from './manage-experiments.component';

describe('ManageExperimentsComponent', () => {
  let component: ManageExperimentsComponent;
  let fixture: ComponentFixture<ManageExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
