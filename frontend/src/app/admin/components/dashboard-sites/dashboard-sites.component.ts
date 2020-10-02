import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/interfaces/base.component';
import { Site } from '@core/models/sites';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { SitesService } from '@core/services/sites/sites.service';
import { ConfirmationService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-sites',
  templateUrl: './dashboard-sites.component.html',
  styleUrls: ['./dashboard-sites.component.sass'],
  providers: [ConfirmationService],
})
export class DashboardSitesComponent extends BaseComponent implements OnInit {
  sites: Site[] = [];
  TITLE_HEADER = 'Título';
  URL_HEADER = 'URL';
  AVAILABLE_HEADER = 'Disponible';
  ACTIONS_HEADER = 'Acciones';

  constructor(
    private sitesService: SitesService,
    private alertsService: AlertsService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  confirmDelete(site: Site): void {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.sitesService
          .delete(site.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((response) => {
            this.alertsService.handleSuccessAlert(
              'Sitio eliminado exitosamente!'
            );
            this.getData();
          });
      },
    });
  }

  private getData(): void {
    this.sitesService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((sites) => (this.sites = sites));
  }
}
