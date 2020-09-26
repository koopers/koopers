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
<<<<<<< HEAD
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AlertsComponent,
    HeaderComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AlertsComponent,
    HeaderComponent
  ]
=======
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [AlertsComponent, ButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AlertsComponent, ButtonComponent],
>>>>>>> f98271654281f8e9a6790ca0569335426fb098c9
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
