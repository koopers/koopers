import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { TrackedSite } from '@core/models/tracked-sites';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { CategoriesService } from '@core/services/categories/categories.service';
import { SitesService } from '@core/services/sites/sites.service';
import { TrackedSitesService } from '@core/services/tracked-sites/tracked-sites.service';
import { SelectItem } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-tracked-sites',
  templateUrl: './form-tracked-sites.component.html',
  styleUrls: ['./form-tracked-sites.component.sass']
})
export class FormTrackedSitesComponent extends BaseComponent implements OnInit {
  trackedSiteForm: FormGroup;
  currentTrackedSite: TrackedSite;
  categories: SelectItem[] = [];
  sites: SelectItem[] = [];
  regURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private tSitesService: TrackedSitesService,
    private location: Location,
    private categoryService: CategoriesService,
    private sitesService: SitesService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.trackedSiteForm = this.fb.group({
      path_url: ['', [Validators.required, Validators.pattern(this.regURL)]],
      site_id: 1,
      category_id: 1
    });

    this.categoryService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(categories => {
      this.categories = categories.map(category => ({label: category.title, value: category.id}));
    });

    this.sitesService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(sites => {
      this.sites = sites.map(site => ({label: site.title, value: site.id}));
    });

    this.route.params.subscribe(params => {
      const {id} = params;
      if (id) {
        this.tSitesService.getOne(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(trackedSite => {
          this.currentTrackedSite = trackedSite;
          this.trackedSiteForm.patchValue(trackedSite);
        });
      }
    });
  }

  get path_url(): FormControl {
    return this.trackedSiteForm.get('path_url') as FormControl;
  }

  invalidControl(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSave(): void {
    if (this.currentTrackedSite) {
      this.tSitesService
      .update(
        this.currentTrackedSite.id,
        this.trackedSiteForm.value
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((category) => {
        this.alertsService.handleSuccessAlert('Sección actualizada exitosamente!');
        this.goBack();
      });
    } else {
      this.tSitesService
      .create(this.trackedSiteForm.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((category) => {
        this.alertsService.handleSuccessAlert('Sección creada exitosamente!');
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
