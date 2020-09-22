import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'kooper';

  constructor(private authService: AuthService) {
    this.authService
      .login('gertellezv@gmail.com', 'platzi2020')
      .subscribe((data) => console.log(data));
  }
}
