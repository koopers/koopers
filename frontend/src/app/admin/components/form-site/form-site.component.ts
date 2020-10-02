import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      url: ['', Validators.required],
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
