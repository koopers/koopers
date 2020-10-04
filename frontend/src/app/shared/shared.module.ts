import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faEdit,
  faHeart,
  faInfoCircle,
  faPlus,
  faSearch,
  faTimes,
  faTimesCircle,
  faTrash,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AlertsComponent,
    ButtonComponent,
    CardComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    DialogModule,
    ProgressSpinnerModule,
  ],
  exports: [
    AlertsComponent,
    ButtonComponent,
    CardComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCheckCircle,
      faEdit,
      faPlus,
      faSearch,
      faTrash,
      faTimesCircle,
      faTimes,
      faInfoCircle,
      faHeart,
      faUser
    );
  }
}
