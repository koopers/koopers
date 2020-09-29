import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrackedSitesComponent } from './dashboard-tracked-sites.component';

describe('DashboardTrackedSitesComponent', () => {
  let component: DashboardTrackedSitesComponent;
  let fixture: ComponentFixture<DashboardTrackedSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTrackedSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTrackedSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
