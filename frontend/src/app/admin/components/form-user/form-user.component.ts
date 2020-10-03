import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@core/interfaces/base.component';
import { User } from '@core/models/users';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { UsersService } from '@core/services/users/users.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.sass']
})
export class FormUserComponent extends BaseComponent implements OnInit {
  userForm: FormGroup;
  currentUser: User;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    super();
   }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      is_staff: false
    });

    this.route.params.subscribe(params => {
      const {id} = params;
      if (id) {
        this.usersService.getOne(id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe(user => {
          this.currentUser = user;
          this.userForm.patchValue(user);
        });
      } else {
        this.addPasswordField(true);
      }
    });
  }

  onSave(): void {
    if (this.currentUser) {
      const values = this.userForm.value;
      delete values.password;

      this.usersService
      .update(
        this.currentUser.id,
        values
      )
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.alertsService.handleSuccessAlert('Usuario actualizado exitosamente!');
        this.goBack();
      });
    } else {
      this.usersService
      .create(this.userForm.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.alertsService.handleSuccessAlert('Usuario creado exitosamente!');
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addPasswordField(checked: boolean): void {
    if (checked) {
      this.userForm.addControl('password', new FormControl('', [Validators.required]));
    } else {
      this.userForm.removeControl('password');
    }
  }
}
