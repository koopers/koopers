import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {UsersService} from '../../../core/services/users/users.service';
import {User} from '../../../core/models/users';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardUsersComponent implements OnInit {
  users: User[] = []

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => this.users = users)
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
          //Actual logic to perform a confirmation
      }
    });
  }

}
