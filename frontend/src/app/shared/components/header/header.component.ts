import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  user = false;
  manteiner = false;
  visible: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    const route = this.router.routerState.snapshot.url;
    const regexRoute = new RegExp('/admin/*');
    if (route.match(regexRoute)) {
      this.authService.getUser().subscribe((user) => {
        if (user.admin === true) {
          this.manteiner = true;
        }
        this.user = true;
      });
    }
    this.primengConfig.ripple = true;
  }

  changePage(route: string): void {
    this.visible = false;
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.user = false;
    this.visible = false;
    this.router.navigate(['/']);
  }
}
