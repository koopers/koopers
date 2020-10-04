import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { SuggestedSite } from '@core/models/suggested-sites';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { SuggestedSitesService } from '@core/services/suggested-sites/suggested-sites.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-suggested-sites',
  templateUrl: './form-suggested-sites.component.html',
  styleUrls: ['./form-suggested-sites.component.sass']
})
export class FormSuggestedSitesComponent extends BaseComponent implements OnInit {
  suggestedForm: FormGroup;
  currentSuggestedSite: SuggestedSite;
  regURL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

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
      url: ['', [Validators.required, Validators.pattern(this.regURL)]],
      categories: this.fb.array([])
    });

    this.route.params.subscribe(params => {
      const {id} = params;
      if (id) {
        this.sSitesService.getOne(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(site => {
          this.currentSuggestedSite = {...site, categories: JSON.parse(site.categories) };
          this.suggestedForm.patchValue(this.currentSuggestedSite);
          this.currentSuggestedSite.categories.forEach(category => {
            this.addCategory(category);
          });
        });
      }
    });
  }

  addCategory(value = ''): void {
    this.categories.push(new FormControl(value, Validators.required));
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  get categories(): FormArray {
    return this.suggestedForm.get('categories') as FormArray;
  }

  get title(): FormControl {
    return this.suggestedForm.get('title') as FormControl;
  }

  get url(): FormControl {
    return this.suggestedForm.get('url') as FormControl;
  }

  invalidControl(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSave(): void {
    const values = this.suggestedForm.value;
    values.categories = JSON.stringify(values.categories);

    if (this.currentSuggestedSite) {
      this.sSitesService
      .update(
        this.currentSuggestedSite.id,
        values
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.alertsService.handleSuccessAlert('Propuesta actualizada exitosamente!');
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
