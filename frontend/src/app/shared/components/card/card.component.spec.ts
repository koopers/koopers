import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map } from 'rxjs/operators';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const matchObj = [ // initially all are false
    { matchStr: Breakpoints.Web, result: false },
    { matchStr: Breakpoints.Tablet, result: false },
    { matchStr: Breakpoints.Small, result: false },
    { matchStr: Breakpoints.XSmall, result: false }
  ];
  const fakeObserve = (s: string[]): Observable<BreakpointState> => from(matchObj).pipe(
      filter(match => match.matchStr === s[0]),
      map(match => <BreakpointState>{ matches: match.result, breakpoints: {} })
  );
  const bpSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);
  bpSpy.observe.and.callFake(fakeObserve);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      providers: [
        { provide: BreakpointObserver, useValue: bpSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with display false', () => {
    expect(component.display).toBeFalse();
  });

  it('should showDialog', () => {
    component.showDialog();
    expect(component.display).toBeTrue();
  });

  it('onClickCard should emit', () => {
    spyOn(component.clickCard, 'emit');
    component.onClickCard({});
    expect(component.clickCard.emit).toHaveBeenCalled();
  });

  describe('observe()', () => {
    function resize(width: number): void {
      matchObj[0].result = (width >= 1025) ? true : false;
      matchObj[1].result = (width >= 1024) ? true : false;
      matchObj[2].result = (width >= 768) ? true : false;
      matchObj[3].result = (width <= 375) ? true : false;
    }

    it('should return WEB', () => {
      resize(1200);
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.desktopSize).toBeTrue();
    });

    it('should return TABLET', () => {
      resize(1100);
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.tabletSize).toBeTrue();
    });

    it('should return MOBILE', () => {
      resize(300);
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.mobileSize).toBeTrue();
    });
});
});
