import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveColumnComponent } from './active-column.component';

describe('ActiveColumnComponent', () => {
  let component: ActiveColumnComponent;
  let fixture: ComponentFixture<ActiveColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
