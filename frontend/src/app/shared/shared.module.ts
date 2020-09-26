import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faEdit,
  faInfoCircle,
  faPlus,
  faSearch,
  faTimes,
  faTimesCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AlertsComponent, ButtonComponent, HeaderComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [AlertsComponent, ButtonComponent, HeaderComponent],
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
      faInfoCircle
    );
  }
}
