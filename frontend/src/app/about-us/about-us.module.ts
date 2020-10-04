import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { TeamDescriptionComponent } from './components/team-description/team-description.component';
import { TeamComponent } from './components/team/team.component';


@NgModule({
  declarations: [TeamComponent, TeamDescriptionComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    DialogModule
  ]
})
export class AboutUsModule { }
