import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/interfaces/base.component';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from 'src/app/core/models/users';

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
      }
    });
  }

  onSave(): void {
    if (this.currentUser) {
      this.usersService
      .update(
        this.currentUser.id,
        this.userForm.value
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

}
