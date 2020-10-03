import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersService } from '@core/services/filters/filters.service';
import { FiltersServiceStub, CategoriesServiceStub, SitesServiceStub } from '@utils/stubs/stubs';
import { CategoriesService } from '@core/services/categories/categories.service';
import { SitesService } from '@core/services/sites/sites.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        {provide: FiltersService, useClass: FiltersServiceStub},
        {provide: CategoriesService, useClass: CategoriesServiceStub},
        {provide: SitesService, useClass: SitesServiceStub}
      ],
      imports: [
        ReactiveFormsModule,
        CalendarModule,
        MultiSelectModule,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
