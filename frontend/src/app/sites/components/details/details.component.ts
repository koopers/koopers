import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { Category } from '@core/models/categories';
import { FiltersService } from '@core/services/filters/filters.service';
import { SitesService } from '@core/services/sites/sites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent extends BaseComponent implements OnInit {
  id: number;
  site;
  screenshots;
  form: FormGroup;
  categories: Category[];
  size = true;
  loading = false;

  constructor(
    private sitesService: SitesService,
    private filtersService: FiltersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public breakpointObserver: BreakpointObserver
  ) {
    super();
    this.builderForm();
  }

  ngOnInit(): void {
    this.getOneSite();
    this.getAllScreenshots(this.id);
    this.resize();
  }

  resize(): void {
    this.loading = true;
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .subscribe((result) => {
        this.loading = false;
        this.size = result.matches;
      });
  }

  getOneSite(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.sitesService.getOneWithDetails(this.id).subscribe((siteDetails) => {
        this.loading = false;
        this.site = siteDetails.site;
        this.categories = siteDetails.categories.map(category => category.category_id);
      });
    });
  }

  getAllScreenshots(id?, categories?: string, date?: number): void {
    this.loading = true;
    this.filtersService.filterOptions(id.toString(), categories, date).subscribe((data) => {
      this.loading = false;
      this.screenshots = data;
    });
  }

  formatedDate(date: string): number {
    const dateFormated = new Date(date);
    return dateFormated.getTime() / 1000;
  }

  search(event: Event): void {
    event.preventDefault();
    this.loading = true;
    const value = this.form.value;
    let categories = value.category;
    const date = this.formatedDate(value.date);
    if (this.form.valid) {
      this.loading = false;
      if (categories) {
        categories = categories.id.toString();
      }
      this.getAllScreenshots(this.id, categories, date);
    }
  }

  private builderForm(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.min(1)],
      category: ['', Validators.min(1)],
    });
  }
}
