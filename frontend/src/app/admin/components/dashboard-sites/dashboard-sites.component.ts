import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {SitesService} from '../../../core/services/sites/sites.service';
import {Site} from '../../../core/models/sites';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-sites',
  templateUrl: './dashboard-sites.component.html',
  styleUrls: ['./dashboard-sites.component.sass'],
  providers: [ConfirmationService]
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

  confirmDelete(site: Site) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.sitesService.delete(site.id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((response) => {
          this.alertsService.handleSuccessAlert('Sitio eliminado exitosamente!');
          this.getData();
        });
      }
    });
  }

  private getData() {
    this.sitesService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(sites => this.sites = sites);
  }

}
