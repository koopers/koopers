import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { Category } from '@core/models/categories';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { CategoriesService } from '@core/services/categories/categories.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.sass']
})
export class FormCategoryComponent extends BaseComponent implements OnInit {
  categoryForm: FormGroup;
  currentCategory: Category;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private categoryService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const {id} = params;
      if (id) {
        this.categoryService.getOne(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(category => {
          this.currentCategory = category;
          this.categoryForm.patchValue(category);
        });
      }
    });
  }

  onSave(): void {
    if (this.currentCategory) {
      this.categoryService
      .update(
        this.currentCategory.id,
        this.categoryForm.value
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((category) => {
        this.alertsService.handleSuccessAlert('Categoría actualizada exitosamente!');
        this.goBack();
      });
    } else {
      this.categoryService
      .create(this.categoryForm.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((category) => {
        this.alertsService.handleSuccessAlert('Categoría creada exitosamente!');
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
