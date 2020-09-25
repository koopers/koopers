import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent implements OnInit {
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
