import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertsComponent } from './alerts.component';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { AlertsServiceStub } from '@utils/stubs/stubs';
import { SUCCESS_TYPE, INFO_TYPE, ERROR_TYPE } from '@core/models/alerts';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;
  let alertsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AlertsService, useClass: AlertsServiceStub}
      ],
      declarations: [ AlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    alertsService = TestBed.inject(AlertsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service showAlert', () => {
    alertsService.showAlert.emit([{message: 'Testing', type: SUCCESS_TYPE}]);
    component.ngOnInit();
    expect(component.alerts).toEqual([{message: 'Testing', type: SUCCESS_TYPE}]);
  });

  it('should call close Alert after some time', fakeAsync(() => {
    spyOn(component, 'closeAlert');
    alertsService.showAlert.emit([{message: 'Testing', type: SUCCESS_TYPE}]);
    component.ngOnInit();
    tick(15001);
    fixture.whenStable().then(() => {
      expect(component.closeAlert).toHaveBeenCalled();
    });
  }));

  it('closeAlert should call service onAlertClosed', () => {
    spyOn(alertsService, 'onAlertClosed');
    const alert = {message: 'Testing', type: SUCCESS_TYPE};
    component.closeAlert(alert);
    expect(alertsService.onAlertClosed).toHaveBeenCalledWith(alert);
  });

  it('checkClass with SUCCESS_TYPE should return', () => {
    const alert = {message: 'Testing', type: SUCCESS_TYPE};
    const result = component.checkClass(alert);
    expect(result).toBe('Alert__div--success');
  });

  it('checkClass with INFO_TYPE should return', () => {
    const alert = {message: 'Testing', type: INFO_TYPE};
    const result = component.checkClass(alert);
    expect(result).toBe('Alert__div--info');
  });

  it('checkClass with INFO_TYPE should return', () => {
    const alert = {message: 'Testing', type: ERROR_TYPE};
    const result = component.checkClass(alert);
    expect(result).toBe('Alert__div--error');
  });

});
