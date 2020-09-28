import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site } from 'src/app/core/models/sites';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
  @Input() item: Site;
  @Input() href: string;
  @Input() title: string;
  @Input() imageSrc: string;
  @Input() description: string;
  @Input() date: string;
  @Output() clickCard: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickCard(event): void {
    this.clickCard.emit(event);
  }
}
