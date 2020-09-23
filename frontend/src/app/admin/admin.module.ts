import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardSitesComponent } from './components/dashboard-sites/dashboard-sites.component';
import { FormSiteComponent } from './components/form-site/form-site.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardSitesComponent, FormSiteComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
