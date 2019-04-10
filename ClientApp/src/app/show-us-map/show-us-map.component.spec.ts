import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsMapComponent } from './show-us-map.component';

describe('ShowUsMapComponent', () => {
  let component: ShowUsMapComponent;
  let fixture: ComponentFixture<ShowUsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
