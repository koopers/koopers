import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {SuggestedSitesService} from '../../../core/services/suggested-sites/suggested-sites.service';
import {SuggestedSite} from '../../../core/models/suggested-sites';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-suggested-sites',
  templateUrl: './dashboard-suggested-sites.component.html',
  styleUrls: ['./dashboard-suggested-sites.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardSuggestedSitesComponent extends BaseComponent implements OnInit {
  suggestedSites: SuggestedSite[] = [];
  TITLE_HEADER = 'Título';
  CATEGORIES_HEADER = 'Categorias';
  URL_HEADER = 'URL';
  ACTIONS_HEADER = 'Acciones';

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

  confirmDelete(tSite: SuggestedSite) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.sSitesService.delete(tSite.id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((response) => {
          this.alertsService.handleSuccessAlert('Propuesta eliminada exitosamente!');
          this.getData();
        });
      }
    });
  }

  private getData() {
    this.sSitesService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(suggestedSites => this.suggestedSites = suggestedSites);
  }


}
