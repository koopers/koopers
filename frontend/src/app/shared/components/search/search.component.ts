import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltersService } from '@core/services/filters/filters.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  sites;
  constructor(private formBuilder: FormBuilder, private filtersService: FiltersService) {
    this.builderForm();
  }

  ngOnInit(): void {}


  filterDate(startDate, endDate): void {
    this.filtersService.filterByDates(startDate, endDate).subscribe(data => {
      this.sites = data;
    });
  }

  formatedDate(date: string): number {
    const dateFormated = new Date(date);
    return dateFormated.getTime() / 1000;
  }



  search(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const startDate = this.formatedDate(value.startDate);
      const endDate = this.formatedDate(value.endDate);

      this.filterDate(startDate, endDate);
    }
  }
  private builderForm(): void {
    this.form = this.formBuilder.group({
      site: ['', [Validators.minLength(4)]],
      categories: ['', Validators.minLength(1)],
      startDate: [new Date()],
      endDate: [new Date()],
    });
  }
}
