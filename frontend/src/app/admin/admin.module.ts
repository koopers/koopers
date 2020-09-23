import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faEdit,
  faFilm,
  faPlus,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardSitesComponent } from './components/dashboard-sites/dashboard-sites.component';
import { FormSiteComponent } from './components/form-site/form-site.component';

@NgModule({
  declarations: [DashboardSitesComponent, FormSiteComponent],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCheckCircle, faEdit, faPlus, faSearch, faTrash, faFilm);
  }
}
