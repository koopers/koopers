import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {TrackedSitesService} from '../../../core/services/tracked-sites/tracked-sites.service';
import {TrackedSite} from '../../../core/models/tracked-sites';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-tracked-sites',
  templateUrl: './dashboard-tracked-sites.component.html',
  styleUrls: ['./dashboard-tracked-sites.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardTrackedSitesComponent extends BaseComponent implements OnInit {
  trackedSites: TrackedSite[] = [];
  SITE_HEADER = 'Sitio';
  CATEGORY_HEADER = 'Categoría';
  URL_HEADER = 'URL';
  ACTIONS_HEADER = 'Acciones';

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

  confirmDelete(tSite: TrackedSite) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.tSitesService.delete(tSite.id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((response) => {
          this.alertsService.handleSuccessAlert('Sección eliminada exitosamente!');
          this.getData();
        });
      }
    });
  }

  private getData() {
    this.tSitesService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(trackedSites => this.trackedSites = trackedSites);
  }

}
