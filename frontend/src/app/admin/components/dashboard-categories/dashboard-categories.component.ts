import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {CategoriesService} from '../../../core/services/categories/categories.service';
import {Category} from '../../../core/models/categories';

@Component({
  selector: 'app-dashboard-categories',
  templateUrl: './dashboard-categories.component.html',
  styleUrls: ['./dashboard-categories.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardCategoriesComponent implements OnInit {
  categories: Category[] = []

  constructor(
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
          //Actual logic to perform a confirmation
      }
    });
  }

}
