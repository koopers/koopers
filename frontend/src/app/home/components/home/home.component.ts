import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/interfaces/base.component';
import { ScreenshotsService } from '@core/services/screenshots/screenshots.service';
import { SitesService } from '@core/services/sites/sites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  sites;
  screenshots = {};
  loading = false;

  constructor(
    private sitesService: SitesService,
    private screenshotsService: ScreenshotsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.sitesService.getCustomSites().subscribe((data) => {
      this.loading = false;
      this.sites = data;
    });
    this.screenshotsService.getAll().subscribe((data) => {
      this.loading = false;
      this.screenshots = data;
    });
  }
}
