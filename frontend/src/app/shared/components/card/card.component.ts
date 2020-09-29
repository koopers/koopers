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

  constructor() {}

  ngOnInit(): void {}

  onClickCard(event): void {
    this.clickCard.emit(event);
  }
}
