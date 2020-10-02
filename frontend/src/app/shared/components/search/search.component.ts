import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@core/services/categories/categories.service';
import { FiltersService } from '@core/services/filters/filters.service';
import { SitesService } from '@core/services/sites/sites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  sites;
  options;
  foundSites;
  constructor(
    private formBuilder: FormBuilder,
    private filtersService: FiltersService,
    private categoriesService: CategoriesService,
    private sitesService: SitesService
  ) {
    this.builderForm();
    this.getCategories();
    this.getSites();
  }

  ngOnInit(): void {}

  getCategories(): void {
    this.categoriesService.getAll().subscribe((data) => (this.options = data));
  }

  getSites(): void {
    this.sitesService.getAll().subscribe((data) => (this.sites = data));
  }

  filterSites(site): void {
    this.filtersService
      .filterBySites(site)
      .subscribe((data) => (this.foundSites = data));
  }

  filterDate(site, startDate, endDate): void {
    this.filtersService
      .filterByDates(site, startDate, endDate)
      .subscribe((data) => (this.foundSites = data));
  }

  filterCategories(site, categories): void {
    this.filtersService
      .filterByCategories(site, categories)
      .subscribe((data) => (this.foundSites = data));
  }

  filterAll(site, categories, startDate, endDate): void {
    this.filtersService
      .filterByAll(site, categories, startDate, endDate)
      .subscribe((data) => (this.foundSites = data));
  }

  formatedDate(date: string): number {
    const dateFormated = new Date(date);
    return dateFormated.getTime() / 1000;
  }

  search(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const sitesId = value.site.map((data) => data.id).toString();
      let categoriesId = value.categories;
      const startDate = this.formatedDate(value.startDate);
      const endDate = this.formatedDate(value.endDate);

      if (categoriesId) {
        categoriesId = categoriesId.map((data) => data.id).toString();
      }

      if (!categoriesId && !startDate && !endDate) {
        this.filterSites(sitesId);
      }

      if (categoriesId && !startDate && !endDate) {
        this.filterCategories(sitesId, categoriesId);
      }

      if (startDate && endDate && !categoriesId) {
        this.filterDate(sitesId, startDate, endDate);
      }
      if (categoriesId && startDate && endDate) {
        this.filterAll(sitesId, categoriesId, startDate, endDate);
      }
    }
  }
  private builderForm(): void {
    this.form = this.formBuilder.group({
      site: ['', [Validators.required, Validators.minLength(1)]],
      categories: ['', Validators.minLength(1)],
      startDate: [''],
      endDate: [''],
    });
  }
}
