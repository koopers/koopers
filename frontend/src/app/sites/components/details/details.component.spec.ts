import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DetailsComponent } from './details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SitesService } from '@core/services/sites/sites.service';
import { SitesServiceStub, FiltersServiceStub } from '@utils/stubs/stubs';
import { FiltersService } from '@core/services/filters/filters.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      providers: [
        {provide: SitesService, useClass: SitesServiceStub},
        {provide: FiltersService, useClass: FiltersServiceStub},
        {provide: ActivatedRoute, useValue: {
          params: of({})
        }}
      ],
      imports: [
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have valid form', () => {
    expect(component.form.valid).toEqual(true);
  });

  it('should format date', () => {
    expect(component.formatedDate('10/03/20')).toBe(1601701200);
  });

  it('when search should preventDefault', () => {
    const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    component.search(e);
    fixture.detectChanges();
    expect(e.preventDefault).toHaveBeenCalled();
  });
});
