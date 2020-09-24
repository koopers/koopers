import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardSitesComponent} from './components/dashboard-sites/dashboard-sites.component';
import {FormSiteComponent} from './components/form-site/form-site.component';

const routes: Routes = [
  {
    path: 'sites', component: DashboardSitesComponent
  },
  {
    path: 'sites/new', component: FormSiteComponent
  },
  {
    path: 'sites/:id', component: FormSiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
