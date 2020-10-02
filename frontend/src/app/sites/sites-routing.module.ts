import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FormSuggestedSitesComponent } from './components/form-suggested-sites/form-suggested-sites.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'detail/:id',
    component: DetailsComponent
  },
  {
    path: 'proposal',
    component: FormSuggestedSitesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
