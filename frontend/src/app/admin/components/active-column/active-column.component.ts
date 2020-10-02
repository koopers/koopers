import {
  Component,
  Input,
  OnChanges, OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-active-column',
  templateUrl: './active-column.component.html',
  styleUrls: ['./active-column.component.sass'],
})
export class ActiveColumnComponent implements OnInit, OnChanges {
  @Input() active = false;
  text = 'No Activo';
  dotClass = 'circle--error';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { active } = changes;

    if (active.currentValue) {
      this.text = 'Activo';
      this.dotClass = 'circle--success';
    } else {
      this.text = 'No Activo';
      this.dotClass = 'circle--error';
    }
  }
}
