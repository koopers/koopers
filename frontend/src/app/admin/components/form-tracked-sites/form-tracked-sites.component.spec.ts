import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrackedSitesComponent } from './form-tracked-sites.component';

describe('FormTrackedSitesComponent', () => {
  let component: FormTrackedSitesComponent;
  let fixture: ComponentFixture<FormTrackedSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrackedSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrackedSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
