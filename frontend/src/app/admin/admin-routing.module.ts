import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardSitesComponent} from './components/dashboard-sites/dashboard-sites.component';
import {FormSiteComponent} from './components/form-site/form-site.component';
import { DashboardCategoriesComponent } from './components/dashboard-categories/dashboard-categories.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
