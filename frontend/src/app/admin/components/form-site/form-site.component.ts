import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { SitesService } from 'src/app/core/services/sites/sites.service';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Site } from 'src/app/core/models/sites';

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
        this.sitesService.getSite(id)
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
      .updateSite(
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
      .createSite(this.siteForm.value)
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
