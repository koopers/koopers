import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { SuggestedSite } from '../../../core/models/suggested-sites';
import { SuggestedSitesService } from '../../../core/services/suggested-sites/suggested-sites.service';

@Component({
  selector: 'app-dashboard-suggested-sites',
  templateUrl: './dashboard-suggested-sites.component.html',
  styleUrls: ['./dashboard-suggested-sites.component.sass'],
  providers: [ConfirmationService],
})
export class DashboardSuggestedSitesComponent
  extends BaseComponent
  implements OnInit {
  suggestedSites: SuggestedSite[] = [];
  TITLE_HEADER = 'Título';
  CATEGORIES_HEADER = 'Categorias';
  URL_HEADER = 'URL';
  ACTIONS_HEADER = 'Acciones';
  loading = false;

  constructor(
    private sSitesService: SuggestedSitesService,
    private alertsService: AlertsService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  confirmDelete(tSite: SuggestedSite): void {
    this.loading = true;
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.sSitesService
          .delete(tSite.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((response) => {
            this.loading = false;
            this.alertsService.handleSuccessAlert(
              'Propuesta eliminada exitosamente!'
            );
            this.getData();
          });
      },
    });
  }

  categoriesLabel(categories): string {
    try {
      return JSON.parse(categories).join(', ');
    } catch (e) {
      return categories;
    }
  }

  private getData(): void {
    this.loading = true;
    this.sSitesService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((suggestedSites) => {
        this.loading = false;
        return (this.suggestedSites = suggestedSites);
      });
  }
}
