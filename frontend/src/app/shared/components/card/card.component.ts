import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Screenshot } from '@core/models/screenshots';
import { Site } from '@core/models/sites';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() item: Site & Screenshot;
  @Output() clickCard?: EventEmitter<string> = new EventEmitter();

  display = false;
  mobileSize = false;
  tabletSize = false;
  desktopSize = false;

  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.resizeDesktop();
    this.resizeTablet();
    this.resizeMobile();
  }

  resizeDesktop(): void {
    this.breakpointObserver
      .observe([Breakpoints.Web])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.desktopSize = state.matches;
        }
        this.desktopSize = state.matches;
      });
  }

  resizeTablet(): void {
    this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Small])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.tabletSize = state.matches;
        }
        this.tabletSize = state.matches;
      });
  }

  resizeMobile(): void {
    this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.mobileSize = state.matches;
      }
      this.mobileSize = state.matches;
    });
  }

  showDialog(): void {
    this.display = true;
  }

  onClickCard(event): void {
    this.clickCard.emit(event);
  }
}
