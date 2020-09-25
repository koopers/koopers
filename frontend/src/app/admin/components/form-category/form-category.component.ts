import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.sass']
})
export class FormCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSave(): void {
    console.log('Values: ', this.categoryForm.value);
    this.alertsService.handleSuccessAlert('Categoría creada exitosamente!');
  }

  goBack(): void {
    this.location.back()
  }

}
