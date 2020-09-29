import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuggestedSitesComponent } from './form-suggested-sites.component';

describe('FormSuggestedSitesComponent', () => {
  let component: FormSuggestedSitesComponent;
  let fixture: ComponentFixture<FormSuggestedSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSuggestedSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuggestedSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
