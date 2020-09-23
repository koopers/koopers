import { Component, OnInit, OnDestroy } from '@angular/core';
import {faCheckCircle, faTimesCircle, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { Subscription } from 'rxjs';

export interface AlertModel {
  message: string;
  type: string;
}

export const SUCCESS_TYPE = 'success';
export const INFO_TYPE = 'info';
export const ERROR_TYPE = 'error';

@Component({
  selector: 'koopers-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})
export class AlertsComponent implements OnInit, OnDestroy {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faTimes = faTimes;
  faInfoCircle = faInfoCircle;
  success_type = SUCCESS_TYPE;
  info_type = INFO_TYPE;
  error_type = ERROR_TYPE;

  alerts: AlertModel[] = []

  alertsSubs: Subscription;

  constructor(private alertService: AlertsService) { }

  ngOnInit(): void {
    this.alertsSubs = this.alertService.showAlert.subscribe((alerts) => {
      this.alerts = alerts;

      setTimeout(() => {
        this.alerts.forEach(alert => this.closeAlert(alert))
      }, 15000)
    })
  }

  ngOnDestroy() {
    this.alertsSubs.unsubscribe();
  }

  closeAlert(alert: AlertModel) {
    this.alertService.onAlertClosed(alert)
  }

  checkClass(alert: AlertModel)  {
    if (alert.type === this.success_type) {
      return 'Alert__div--success';
    }

    if (alert.type === this.info_type) {
      return 'Alert__div--info';
    }

    return 'Alert__div--error';
  }

}
