import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private authService: AuthService,
    private alertsService: AlertsService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  register(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const user = {
        username: value.email,
        password: value.password,
        is_staff: value.isAdmin || false,
      };
      this.authService.register(user).subscribe(
        () => {
          this.alertsService.handleSuccessAlert('Registro exitoso.');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          const msg = error.error.username[0];
          this.alertsService.handleErrorAlert(msg);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      isAdmin: [''],
    });
  }
}
