import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { Site } from '@core/models/sites';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { SitesService } from '@core/services/sites/sites.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-site',
  templateUrl: './form-site.component.html',
  styleUrls: ['./form-site.component.sass'],
})
export class FormSiteComponent extends BaseComponent implements OnInit {
  siteForm: FormGroup;
  currentSite: Site;
  regURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private sitesService: SitesService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(this.regURL)]],
      available: false,
    });

    this.route.params.subscribe(params => {
      const {id} = params;
      if (id) {
        this.sitesService.getOne(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(site => {
          this.currentSite = site;
          this.siteForm.patchValue(site);
        });
      }
    });
  }

  get title(): FormControl {
    return this.siteForm.get('title') as FormControl;
  }

  get url(): FormControl {
    return this.siteForm.get('url') as FormControl;
  }

  invalidControl(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSave(): void {
    if (this.currentSite) {
      this.sitesService
      .update(
        this.currentSite.id,
        this.siteForm.value
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((site) => {
        this.alertsService.handleSuccessAlert('Sitio actualizado exitosamente!');
        this.goBack();
      });
    } else {
      this.sitesService
      .create(this.siteForm.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((site) => {
        this.alertsService.handleSuccessAlert('Sitio creado exitosamente!');
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
