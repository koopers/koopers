import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'kooper';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((data) => {
      console.log('AppComponent -> ngOnInit -> data', data);
    });
  }
}
