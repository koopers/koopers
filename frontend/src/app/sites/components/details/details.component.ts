import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { Site } from '@core/models/sites';
import { FiltersService } from '@core/services/filters/filters.service';
import { SitesService } from '@core/services/sites/sites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
})
export class DetailsComponent extends BaseComponent implements OnInit {
  id: number;
  site: Site;
  screenshots;
  form: FormGroup;
  categories = [];
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
    this.getAllScreenshots();
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
      this.sitesService.getOne(this.id).subscribe((site) => {
        this.loading = false;
        this.site = site;
      });
    });
  }

  getAllScreenshots(): void {
    this.loading = true;
    this.filtersService.filterBySites(this.id.toString()).subscribe((data) => {
      this.loading = false;
      this.screenshots = data;
    });
  }

  search(event: Event): void {
    // this.loading = true;
  }

  private builderForm(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      category: ['', Validators.required],
    });
  }
}
