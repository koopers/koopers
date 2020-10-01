import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DetailsComponent } from './components/details/details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SitesRoutingModule } from './sites-routing.module';



@NgModule({
  declarations: [DetailsComponent, SearchPageComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class SitesModule { }
