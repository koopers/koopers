import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SitesRoutingModule } from './sites-routing.module';



@NgModule({
  declarations: [DetailsComponent, SearchPageComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule
  ]
})
export class SitesModule { }
