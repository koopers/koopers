import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertsComponent } from './components/alerts/alerts.component';
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
})
export class SharedModule { }
