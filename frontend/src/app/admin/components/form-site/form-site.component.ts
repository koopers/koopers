import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

@Component({
  selector: 'app-form-site',
  templateUrl: './form-site.component.html',
  styleUrls: ['./form-site.component.sass'],
})
export class FormSiteComponent implements OnInit {
  siteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      Available: false,
    });
  }

  onSave(): void {
    console.log('Values: ', this.siteForm.value);
    this.alertsService.handleSuccessAlert('Sitio creado exitosamente!');
    this.alertsService.handleInfoAlert('Sitio creado exitosamente!');
    this.alertsService.handleErrorAlert('Sitio creado exitosamente!');
  }

  goBack(): void {
    this.location.back()
  }
}
