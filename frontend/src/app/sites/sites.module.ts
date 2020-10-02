import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DetailsComponent } from './components/details/details.component';
import { FormSuggestedSitesComponent } from './components/form-suggested-sites/form-suggested-sites.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SitesRoutingModule } from './sites-routing.module';

@NgModule({
  declarations: [DetailsComponent, SearchPageComponent, FormSuggestedSitesComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule,
    ProgressSpinnerModule
  ]
})
export class SitesModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus, faTrash);
  }
}
