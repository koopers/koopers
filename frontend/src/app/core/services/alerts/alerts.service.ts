import { EventEmitter, Injectable } from '@angular/core';
import {
  Alert,
  ERROR_TYPE,
  INFO_TYPE,
  SUCCESS_TYPE,
} from '../../models/alerts';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  alerts: Alert[] = [];
  showAlert = new EventEmitter<Alert[]>();
  closeAlert = new EventEmitter<Alert>();

  constructor() {}

  addAlert(alert: Alert): void {
    this.alerts.push(alert);
  }

  handleAlert(alert: Alert): void {
    this.addAlert(alert);
    this.showAlert.emit(this.alerts);
  }

  handleSuccessAlert(message: string): void {
    this.handleAlert({ message, type: SUCCESS_TYPE });
  }

  handleInfoAlert(message: string): void {
    this.handleAlert({ message, type: INFO_TYPE });
  }

  handleErrorAlert(message: string): void {
    this.handleAlert({ message, type: ERROR_TYPE });
  }

  onAlertClosed(alert: Alert): void {
    const index = this.alerts.indexOf(alert);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
    this.closeAlert.emit(alert);
  }
}
