import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() isIcon: false;
  @Output() clickButton: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickButton(event): void {
    this.clickButton.emit(event);
  }
}
