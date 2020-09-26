import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSitesComponent } from './dashboard-sites.component';

describe('DashboardSitesComponent', () => {
  let component: DashboardSitesComponent;
  let fixture: ComponentFixture<DashboardSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
