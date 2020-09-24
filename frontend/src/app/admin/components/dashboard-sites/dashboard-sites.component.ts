import { Component, OnInit } from '@angular/core';
import {SitesService} from '../../../core/services/sites/sites.service';

@Component({
  selector: 'app-dashboard-sites',
  templateUrl: './dashboard-sites.component.html',
  styleUrls: ['./dashboard-sites.component.sass']
})
export class DashboardSitesComponent implements OnInit {
  sites = [
      {
          "id": 1,
          "title": "El universal",
          "url": "https://www.eluniversal.com.co/",
          "available": true,
          "created": "2020-09-21T12:54:09.759990-05:00",
          "updated": "2020-09-21T12:54:09.759990-05:00"
      },
      {
          "id": 2,
          "title": "New York Times",
          "url": "https://www.nytimes.com/es/",
          "available": true,
          "created": "2020-09-21T12:55:01.239635-05:00",
          "updated": "2020-09-21T12:55:01.239635-05:00"
      },
      {
          "id": 3,
          "title": "Washington Post",
          "url": "https://www.washingtonpost.com/",
          "available": false,
          "created": "2020-09-21T12:55:51.647464-05:00",
          "updated": "2020-09-21T12:55:51.647464-05:00"
      },
  ]

  constructor(private sitesService: SitesService) { }

  ngOnInit(): void {
    this.sitesService.getSites().subscribe((sites:any) => this.sites = sites)
  }

}
