import { Component, Input, OnInit } from '@angular/core';
import { Partner } from '@core/models/partners';
@Component({
  selector: 'app-team-description',
  templateUrl: './team-description.component.html',
  styleUrls: ['./team-description.component.sass'],
})
export class TeamDescriptionComponent implements OnInit {
  @Input() partner: Partner;
  display = false;


  constructor() {}

  ngOnInit(): void {}

  showModal(): void {
    this.display = true;
  }
}
