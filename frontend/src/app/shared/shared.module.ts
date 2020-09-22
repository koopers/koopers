import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertsComponent } from './components/alerts/alerts.component';

@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    AlertsComponent
  ]
})
export class SharedModule { }
