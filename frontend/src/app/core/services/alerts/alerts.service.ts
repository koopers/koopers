import { Injectable, EventEmitter } from '@angular/core';
import { AlertModel, SUCCESS_TYPE, INFO_TYPE, ERROR_TYPE } from 'src/app/shared/components/alerts/alerts.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  alerts: AlertModel[] = []
  showAlert = new EventEmitter<AlertModel[]>();
  closeAlert = new EventEmitter<AlertModel>();

  constructor() { }

  addAlert(alert: AlertModel) {
    this.alerts.push(alert)
  }

  handleAlert(alert: AlertModel) {
    this.addAlert(alert)
    this.showAlert.emit(this.alerts)
  }

  handleSuccessAlert(message: string) {
    this.handleAlert({message, type: SUCCESS_TYPE})
  }

  handleInfoAlert(message: string) {
    this.handleAlert({message, type: INFO_TYPE})
  }

  handleErrorAlert(message: string) {
    this.handleAlert({message, type: ERROR_TYPE})
  }

  onAlertClosed(alert: AlertModel) {
    const index = this.alerts.indexOf(alert);
    if(index !== -1) {
      this.alerts.splice(index, 1);
    }
    this.closeAlert.emit(alert);
  }
}
