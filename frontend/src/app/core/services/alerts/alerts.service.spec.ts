import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { SUCCESS_TYPE, INFO_TYPE, ERROR_TYPE } from '@core/models/alerts';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should alerts be init', () => {
    expect(service.alerts.length).toBe(0);
  });

  it('should add and alert', () => {
    expect(service.alerts.length).toBe(0);
    service.addAlert({message: 'Testing', type: SUCCESS_TYPE});
    expect(service.alerts.length).toBe(1);
  });

  it('handle alert should call addAlert', () => {
    spyOn(service, 'addAlert');
    const alert = {message: 'Testing', type: SUCCESS_TYPE};
    service.handleAlert(alert);
    expect(service.addAlert).toHaveBeenCalledWith(alert);
  });

  it('handle alert should emit showAlert', () => {
    spyOn(service.showAlert, 'emit');
    const alert = {message: 'Testing', type: SUCCESS_TYPE};
    service.handleAlert(alert);
    expect(service.showAlert.emit).toHaveBeenCalledWith(service.alerts);
  });

  it('handleSuccessAlert should call handleAlert', () => {
    spyOn(service, 'handleAlert');
    const message = 'Testing';
    service.handleSuccessAlert(message);
    expect(service.handleAlert).toHaveBeenCalledWith({message, type: SUCCESS_TYPE});
  });

  it('handleInfoAlert should call handleAlert', () => {
    spyOn(service, 'handleAlert');
    const message = 'Testing';
    service.handleInfoAlert(message);
    expect(service.handleAlert).toHaveBeenCalledWith({message, type: INFO_TYPE});
  });

  it('handleErrorAlert should call handleAlert', () => {
    spyOn(service, 'handleAlert');
    const message = 'Testing';
    service.handleErrorAlert(message);
    expect(service.handleAlert).toHaveBeenCalledWith({message, type: ERROR_TYPE});
  });

  it('onAlertClosed should remove alerts', () => {
    const alert = {message: 'Testing', type: SUCCESS_TYPE};
    service.addAlert(alert);
    expect(service.alerts.length).toBe(1);
    service.onAlertClosed(alert);
    expect(service.alerts.length).toBe(0);
  });

  it('onAlertClosed should emit closeAlert', () => {
    spyOn(service.closeAlert, 'emit');
    const alert = {message: 'Testing', type: SUCCESS_TYPE};
    service.onAlertClosed(alert);
    expect(service.closeAlert.emit).toHaveBeenCalledWith(alert);
  });
});
