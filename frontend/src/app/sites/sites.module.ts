import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { DetailsComponent } from './component/details/details.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [DetailsComponent, SearchComponent],
  imports: [
    CommonModule,
    SitesRoutingModule
  ]
})
export class SitesModule { }
