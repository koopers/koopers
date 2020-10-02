import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BaseComponent } from '@core/interfaces/base.component';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { SuggestedSitesService } from '@core/services/suggested-sites/suggested-sites.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-suggested-sites',
  templateUrl: './form-suggested-sites.component.html',
  styleUrls: ['./form-suggested-sites.component.sass']
})
export class FormSuggestedSitesComponent extends BaseComponent implements OnInit {
  suggestedForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private sSitesService: SuggestedSitesService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.suggestedForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      categories: this.fb.array([])
    });
  }

  addCategory(value = ''): void {
    this.categories.push(new FormControl(value));
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  get categories(): FormArray {
    return this.suggestedForm.get('categories') as FormArray;
  }

  onSave(): void {
    const values = this.suggestedForm.value;
    values.categories = JSON.stringify(values.categories);

    this.sSitesService
    .create(values)
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((site) => {
      this.alertsService.handleSuccessAlert('Propuesta creada exitosamente!');
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }

}
