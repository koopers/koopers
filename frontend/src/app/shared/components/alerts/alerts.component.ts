import { Component, OnInit, OnDestroy } from '@angular/core';
import {faCheckCircle, faTimesCircle, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

export interface AlertModel {
  title: string;
  message: string;
  type: string;
}

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

  alerts: AlertModel[] = [
    {
      title: 'Success',
      message: 'El sitio se ha creado exitosamente',
      type: 'success'
    },
    {
      title: 'Info',
      message: 'Verifica los datos y vuelve a intentarlo',
      type: 'info'
    },
    {
      title: 'Error',
      message: 'Algo salio mal, testing',
      type: 'error'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  closeAlert(alert: AlertModel) {
    const index = this.alerts.indexOf(alert);
    if(index != -1) {
      this.alerts.splice(index, 1)
    }
  }

  checkClass(alert: AlertModel)  {
    if (alert.type === 'success') {
      return 'Alert__div--success';
    }

    if (alert.type === 'info') {
      return 'Alert__div--info';
    }

    return 'Alert__div--error';
  }

}
