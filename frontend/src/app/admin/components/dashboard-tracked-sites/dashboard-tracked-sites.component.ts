import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/interfaces/base.component';
import { TrackedSite } from '@core/models/tracked-sites';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TrackedSitesService } from '@core/services/tracked-sites/tracked-sites.service';
import { ConfirmationService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-tracked-sites',
  templateUrl: './dashboard-tracked-sites.component.html',
  styleUrls: ['./dashboard-tracked-sites.component.sass'],
  providers: [ConfirmationService],
})
export class DashboardTrackedSitesComponent
  extends BaseComponent
  implements OnInit {
  trackedSites: TrackedSite[] = [];
  SITE_HEADER = 'Sitio';
  CATEGORY_HEADER = 'Categoría';
  URL_HEADER = 'URL';
  ACTIONS_HEADER = 'Acciones';
  loading = false;

  constructor(
    private tSitesService: TrackedSitesService,
    private alertsService: AlertsService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  confirmDelete(tSite: TrackedSite): void {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.tSitesService
          .delete(tSite.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => {
            this.loading = true;
            this.alertsService.handleSuccessAlert(
              'Sección eliminada exitosamente!'
            );
            this.getData();
          });
      },
    });
  }

  private getData(): void {
    this.loading = true;
    this.tSitesService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((trackedSites) => {
        this.loading = false;
        return (this.trackedSites = trackedSites);
      });
  }
}
