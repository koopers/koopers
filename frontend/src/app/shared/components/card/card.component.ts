import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site } from 'src/app/core/models/sites';

interface CardItem {
  title: string;
  description?: string;
  date?: string;
  href: string;
  image_src_mobile: string;
  image_src_tablet: string;
  image_src_desktop: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() item: CardItem;
  @Output() clickCard?: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickCard(event): void {
    this.clickCard.emit(event);
  }
}
