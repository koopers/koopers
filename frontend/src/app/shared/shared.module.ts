import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [AlertsComponent, ButtonComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AlertsComponent, ButtonComponent],
})
export class SharedModule {}
