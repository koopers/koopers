import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuggestedSitesComponent } from './dashboard-suggested-sites.component';

describe('DashboardSuggestedSitesComponent', () => {
  let component: DashboardSuggestedSitesComponent;
  let fixture: ComponentFixture<DashboardSuggestedSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSuggestedSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuggestedSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
