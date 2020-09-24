import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {SitesService} from '../../../core/services/sites/sites.service';
import {Site} from '../../../core/models/sites';

@Component({
  selector: 'app-dashboard-sites',
  templateUrl: './dashboard-sites.component.html',
  styleUrls: ['./dashboard-sites.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardSitesComponent implements OnInit {
  sites: Site[] = []

  constructor(
    private sitesService: SitesService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.sitesService.getSites().subscribe((sites:any) => this.sites = sites)
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
