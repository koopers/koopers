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
import { sites, categories } from '@utils/mocks/mocks';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let filterService: FiltersService;

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
    filterService = TestBed.inject(FiltersService);
    fixture.detectChanges();
  });

  afterAll(() => {
    filterService = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have valid form', () => {
    expect(component.form.valid).toEqual(true);
  });

  it('filterAll should call service filterByAll', () => {
    spyOn(filterService, 'filterOptions').and.callThrough();
    const siteId = '1';
    const categories = 'test';
    const startDate = 123123;
    const endDate = 123124;
    component.filterAll(siteId, categories, startDate, endDate);
    expect(filterService.filterOptions).toHaveBeenCalledWith(siteId, categories, startDate, endDate);
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

  describe('when valid form', () => {

    beforeEach(() => {
      const data = {
        site: [sites[0]],
        categories: [categories[0]],
        startDate: '',
        endDate: ''
      };
      component.form.patchValue(data);
      fixture.detectChanges();
    });

    it('should valid form', () => {
      expect(component.form.valid).toEqual(true);
    });

    it('when search should preventDefault', () => {
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.search(e);
      fixture.detectChanges();
      expect(e.preventDefault).toHaveBeenCalled();
    });

  });

  it('if only sites when search should preventDefault', () => {
    spyOn(component, 'filterAll');
    const data = {
      site: [sites[0]]
    };
    component.form.patchValue(data);
    fixture.detectChanges();
    const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    component.search(e);
    fixture.detectChanges();
    expect(component.filterAll).toHaveBeenCalled();
  });
});
