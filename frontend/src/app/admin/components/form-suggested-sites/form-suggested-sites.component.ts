import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { SuggestedSitesService } from 'src/app/core/services/suggested-sites/suggested-sites.service';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SuggestedSite } from 'src/app/core/models/suggested-sites';

@Component({
  selector: 'app-form-suggested-sites',
  templateUrl: './form-suggested-sites.component.html',
  styleUrls: ['./form-suggested-sites.component.sass']
})
export class FormSuggestedSitesComponent extends BaseComponent implements OnInit {
  suggestedForm: FormGroup;
  currentSuggestedSite: SuggestedSite;

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

    this.route.params.subscribe(params => {
      const {id} = params;
      if (id) {
        this.sSitesService.getOne(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(site => {
          this.currentSuggestedSite = site;
          this.suggestedForm.patchValue(site);
        });
      }
    });
  }

  addCategory(): void {
    this.categories.push(new FormControl(''));
  }

  removeCategory(index: number): void {
    this.categories.removeAt(index);
  }

  get categories(): FormArray {
    return this.suggestedForm.get('categories') as FormArray;
  }

  onSave(): void {
    if (this.currentSuggestedSite) {
      this.sSitesService
      .update(
        this.currentSuggestedSite.id,
        this.suggestedForm.value
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((site) => {
        this.alertsService.handleSuccessAlert('Propuesta actualizada exitosamente!');
        this.goBack();
      });
    } else {

      console.log('Values: ', this.suggestedForm.value);
      // this.sSitesService
      // .create(this.suggestedForm.value)
      // .pipe(
      //   takeUntil(this.unsubscribe$)
      // ).subscribe((site) => {
      //   this.alertsService.handleSuccessAlert('Propuesta creada exitosamente!');
      //   this.goBack();
      // });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
