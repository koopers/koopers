import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/interfaces/base.component';
import { Site } from '@core/models/sites';
import { ScreenshotsService } from '@core/services/screenshots/screenshots.service';
import { SitesService } from '@core/services/sites/sites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  sites: Site[];
  screenshots;
  constructor(private sitesService: SitesService, private screenshotsService: ScreenshotsService) {
    super();
  }

  ngOnInit(): void {
    this.sitesService.getAll().subscribe((data) => {
      console.log('HomeComponent -> ngOnInit -> data', data);
      this.sites = data;
    });
    this.screenshotsService.getAll().subscribe(data => {
      console.log('HomeComponent -> ngOnInit -> data', data);
      this.screenshots = data;
    });
  }

  search(event: Event) {
    console.log("HomeComponent -> search -> event", event)
    console.log('hola');
  }
}
