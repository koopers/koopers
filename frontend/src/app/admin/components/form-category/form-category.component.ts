import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/core/models/categories';

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
