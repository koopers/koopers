import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private router: Router,
    private alertsService: AlertsService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const user = {
        username: value.email,
        password: value.password,
      };
      this.authService.login(user).subscribe(
        () => {
          this.alertsService.handleSuccessAlert('Inicio de sesión exitoso.');
          this.router.navigate(['/admin/sites']);
        },
        (error) => {
          const msg = error?.error?.detail || 'Por favor revise el correo y la contraseña e intentelo de nuevo.';
          this.alertsService.handleErrorAlert(msg);
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  invalidControl(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
