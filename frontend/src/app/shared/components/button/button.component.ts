import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() btn: string;
  @Input() type = 'button';
  @Input() isIcon: false;
  @Input() disabled: false;
  @Output() clickButton: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickButton(event): void {
    this.clickButton.emit(event);
  }
}
