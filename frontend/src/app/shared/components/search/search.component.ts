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
  loading = false;
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
    this.loading = true;
    this.categoriesService.getAll().subscribe((data) => {
      this.loading = false;
      this.options = data;
    });
  }

  getSites(): void {
    this.loading = true;
    this.sitesService.getAll().subscribe((data) => {
      this.loading = false;
      this.sites = data;
    });
  }

  filterAll(site, categories, startDate, endDate): void {
    this.loading = true;
    this.filtersService
      .filterOptions(site, categories, startDate, endDate)
      .subscribe((data) => {
        this.loading = false;
        this.foundSites = data;
      });
  }

  formatedDate(date: string): number {
    const dateFormated = new Date(date);
    return dateFormated.getTime() / 1000;
  }

  search(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      let sitesId = value.site;
      let categoriesId = value.categories;
      const startDate = this.formatedDate(value.startDate);
      const endDate = this.formatedDate(value.endDate);

      if (sitesId) {
        sitesId = sitesId.map((data: any) => data.id).toString();
      }

      if (categoriesId) {
        categoriesId = categoriesId.map((data: any) => data.id).toString();
      }
      this.filterAll(sitesId, categoriesId, startDate, endDate);
    }
  }
  private builderForm(): void {
    this.form = this.formBuilder.group({
      site: ['', [Validators.minLength(1)]],
      categories: ['', Validators.minLength(1)],
      startDate: [''],
      endDate: [''],
    });
  }
}
