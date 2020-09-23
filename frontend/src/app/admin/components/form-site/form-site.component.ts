import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-site',
  templateUrl: './form-site.component.html',
  styleUrls: ['./form-site.component.sass']
})
export class FormSiteComponent implements OnInit {
  siteForm: FormGroup;

  constructor(private fb: FormBuilder, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.siteForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  onSave() {
    console.log('Values: ', this.siteForm.value);
    this.alertsService.handleSuccessAlert('Sitio creado exitosamente!')
    this.alertsService.handleInfoAlert('Sitio creado exitosamente!')
    this.alertsService.handleErrorAlert('Sitio creado exitosamente!')
  }

}
