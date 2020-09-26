import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.sass']
})
export class FormUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertsService: AlertsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      is_staff: false
    });
  }

  onSave(): void {
    console.log('Values: ', this.userForm.value);
    this.alertsService.handleSuccessAlert('Usuario creado exitosamente!');
  }

  goBack(): void {
    this.location.back()
  }

}
