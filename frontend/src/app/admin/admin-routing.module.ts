import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardSitesComponent} from './components/dashboard-sites/dashboard-sites.component';
import {FormSiteComponent} from './components/form-site/form-site.component';
import { DashboardCategoriesComponent } from './components/dashboard-categories/dashboard-categories.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { DashboardTrackedSitesComponent } from './components/dashboard-tracked-sites/dashboard-tracked-sites.component';
import { FormTrackedSitesComponent } from './components/form-tracked-sites/form-tracked-sites.component';

const routes: Routes = [
  {
    path: 'sites', component: DashboardSitesComponent
  },
  {
    path: 'sites/new', component: FormSiteComponent
  },
  {
    path: 'sites/:id', component: FormSiteComponent
  },
  {
    path: 'categories', component: DashboardCategoriesComponent
  },
  {
    path: 'categories/new', component: FormCategoryComponent
  },
  {
    path: 'categories/:id', component: FormCategoryComponent
  },
  {
    path: 'users', component: DashboardUsersComponent
  },
  {
    path: 'users/new', component: FormUserComponent
  },
  {
    path: 'users/:id', component: FormUserComponent
  },
  {
    path: 'sections', component: DashboardTrackedSitesComponent
  },
  {
    path: 'sections/new', component: FormTrackedSitesComponent
  },
  {
    path: 'sections/:id', component: FormTrackedSitesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
