import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

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
    private categoryService: CategoriesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSave(): void {
    this.categoryService
    .createCategory(this.categoryForm.value)
    .subscribe((category) => {
      this.alertsService.handleSuccessAlert('Categoría creada exitosamente!');
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
