import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '@shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DetailsComponent } from './components/details/details.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SitesRoutingModule } from './sites-routing.module';
import { FormSuggestedSitesComponent } from './components/form-suggested-sites/form-suggested-sites.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [DetailsComponent, SearchPageComponent, FormSuggestedSitesComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule,
    FontAwesomeModule
  ]
})
export class SitesModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPlus, faTrash);
  }
}
