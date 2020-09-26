import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  template: `
      <div>
          base works!!
      </div>
  `
})
export class BaseComponent implements OnDestroy {
  unsubscribe$ = new Subject();

  constructor() { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
