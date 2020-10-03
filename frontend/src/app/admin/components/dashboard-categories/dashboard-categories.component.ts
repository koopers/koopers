import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/interfaces/base.component';
import { Category } from '@core/models/categories';
import { CategoriesService } from '@core/services/categories/categories.service';
import { ConfirmationService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

@Component({
  selector: 'app-dashboard-categories',
  templateUrl: './dashboard-categories.component.html',
  styleUrls: ['./dashboard-categories.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardCategoriesComponent extends BaseComponent implements OnInit {
  categories: Category[] = [];
  TITLE_HEADER = 'Título';
  DATE_HEADER = 'Fecha de creación';
  ACTIONS_HEADER = 'Acciones';

  constructor(
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private alertsService: AlertsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  confirmDelete(category: Category): void {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
          this.categoriesService.delete(category.id)
          .pipe(
            takeUntil(this.unsubscribe$)
          )
          .subscribe(() => {
            this.alertsService.handleSuccessAlert('Categoría eliminada exitosamente!');
            this.getData();
          });
      }
    });
  }

  private getData(): void {
    this.categoriesService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(categories => this.categories = categories);
  }

}
