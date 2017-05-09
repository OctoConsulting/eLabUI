import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFilesComponent } from './case-files.component';

describe('CaseFilesComponent', () => {
  let component: CaseFilesComponent;
  let fixture: ComponentFixture<CaseFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
