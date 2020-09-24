import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {slideAlert, closeAllAlerts} from './alerts.animations';
import {
  Alert,
  ERROR_TYPE,
  INFO_TYPE,
  SUCCESS_TYPE,
} from '../../../core/models/alerts';
import { AlertsService } from '../../../core/services/alerts/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass'],
  animations: [
    slideAlert(),
    closeAllAlerts()
  ]
})
export class AlertsComponent implements OnInit, OnDestroy {
  successType = SUCCESS_TYPE;
  infoType = INFO_TYPE;
  errorType = ERROR_TYPE;

  alerts: Alert[] = [];

  alertsSubs: Subscription;

  constructor(private alertService: AlertsService) {}

  ngOnInit(): void {
    this.alertsSubs = this.alertService.showAlert.subscribe((alerts) => {
      this.alerts = alerts;

      setTimeout(() => {
        this.alerts.forEach((alert) => this.closeAlert(alert));
      }, 15000);
    });
  }

  ngOnDestroy(): void {
    this.alertsSubs.unsubscribe();
  }

  closeAlert(alert: Alert): void {
    this.alertService.onAlertClosed(alert);
  }

  checkClass(alert: Alert): string {
    if (alert.type === SUCCESS_TYPE) {
      return 'Alert__div--success';
    }

    if (alert.type === INFO_TYPE) {
      return 'Alert__div--info';
    }

    return 'Alert__div--error';
  }
}
