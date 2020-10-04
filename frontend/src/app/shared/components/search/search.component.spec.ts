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

  // it('should have invalid form', () => {
  //   expect(component.form.valid).toEqual(false);
  // });

  // it('filterSites should call service filterBySites', () => {
  //   spyOn(filterService, 'filterBySites').and.callThrough();
  //   const siteId = '1';
  //   component.filterSites(siteId);
  //   expect(filterService.filterBySites).toHaveBeenCalledWith(siteId);
  // });

  // it('filterDate should call service filterByDates', () => {
  //   spyOn(filterService, 'filterByDates').and.callThrough();
  //   const siteId = '1';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   component.filterDate(siteId, startDate, endDate);
  //   expect(filterService.filterByDates).toHaveBeenCalledWith(siteId, startDate, endDate);
  // });

  // it('filterCategories should call service filterByCategories', () => {
  //   spyOn(filterService, 'filterByCategories').and.callThrough();
  //   const siteId = '1';
  //   const categories = '';
  //   component.filterCategories(siteId, categories);
  //   expect(filterService.filterByCategories).toHaveBeenCalledWith(siteId, categories);
  // });

  // it('filterAll should call service filterByAll', () => {
  //   spyOn(filterService, 'filterByAll').and.callThrough();
  //   const siteId = '1';
  //   const categories = '';
  //   const startDate = 123123;
  //   const endDate = 123124;
  //   component.filterAll(siteId, categories, startDate, endDate);
  //   expect(filterService.filterByAll).toHaveBeenCalledWith(siteId, categories, startDate, endDate);
  // });

  it('should format date', () => {
    expect(component.formatedDate('10/03/20')).toBe(1601701200);
  });

  // it('when search should preventDefault', () => {
  //   const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
  //   component.search(e);
  //   fixture.detectChanges();
  //   expect(e.preventDefault).toHaveBeenCalled();
  // });

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

    // it('when search should preventDefault', () => {
    //   const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    //   component.search(e);
    //   fixture.detectChanges();
    //   expect(e.preventDefault).toHaveBeenCalled();
    // });

  });

  // it('if only sites when search should preventDefault', () => {
  //   spyOn(component, 'filterSites');
  //   const data = {
  //     site: [sites[0]]
  //   };
  //   component.form.patchValue(data);
  //   fixture.detectChanges();
  //   const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
  //   component.search(e);
  //   fixture.detectChanges();
  //   expect(component.filterSites).toHaveBeenCalled();
  // });
});
