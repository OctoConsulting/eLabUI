import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbiHeaderComponent } from './fbi-header.component';

describe('FbiHeaderComponent', () => {
  let component: FbiHeaderComponent;
  let fixture: ComponentFixture<FbiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbiHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
