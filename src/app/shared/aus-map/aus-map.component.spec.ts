import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusMapComponent } from './aus-map.component';

describe('AusMapComponent', () => {
  let component: AusMapComponent;
  let fixture: ComponentFixture<AusMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
