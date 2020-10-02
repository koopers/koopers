import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faFilm,
  faPlus,
  faSearch,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '@shared/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { AdminRoutingModule } from './admin-routing.module';
import { ActiveColumnComponent } from './components/active-column/active-column.component';
import { DashboardCategoriesComponent } from './components/dashboard-categories/dashboard-categories.component';
import { DashboardSitesComponent } from './components/dashboard-sites/dashboard-sites.component';
import { DashboardSuggestedSitesComponent } from './components/dashboard-suggested-sites/dashboard-suggested-sites.component';
import { DashboardTrackedSitesComponent } from './components/dashboard-tracked-sites/dashboard-tracked-sites.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { FormSiteComponent } from './components/form-site/form-site.component';
import { FormSuggestedSitesComponent } from './components/form-suggested-sites/form-suggested-sites.component';
import { FormTrackedSitesComponent } from './components/form-tracked-sites/form-tracked-sites.component';
import { FormUserComponent } from './components/form-user/form-user.component';

@NgModule({
  declarations: [
    DashboardSitesComponent,
    FormSiteComponent,
    ActiveColumnComponent,
    DashboardCategoriesComponent,
    FormCategoryComponent,
    DashboardUsersComponent,
    FormUserComponent,
    DashboardTrackedSitesComponent,
    FormTrackedSitesComponent,
    FormSuggestedSitesComponent,
    DashboardSuggestedSitesComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    InputSwitchModule,
    ConfirmDialogModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCheckCircle,
      faEdit,
      faPlus,
      faSearch,
      faTrash,
      faFilm,
      faCircle
    );
  }
}
