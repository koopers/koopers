import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {UsersService} from '../../../core/services/users/users.service';
import { AlertsService } from 'src/app/core/services/alerts/alerts.service';
import {BaseComponent} from '../../../core/interfaces/base.component';
import { takeUntil } from 'rxjs/operators';
import {User} from '../../../core/models/users';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.sass'],
  providers: [ConfirmationService]
})
export class DashboardUsersComponent extends BaseComponent implements OnInit {
  users: User[] = [];
  USERNAME_HEADER = 'Usuario';
  TYPE_HEADER = 'Tipo';
  DATE_HEADER = 'Fecha de creación';
  ACTIONS_HEADER = 'Acciones';

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private alertsService: AlertsService,
  ) {
    super();
   }

  ngOnInit(): void {
    this.getData();
  }

  confirmDelete(user: User) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas realizar esta acción?',
      accept: () => {
        this.usersService.delete(user.id)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((response) => {
          this.alertsService.handleSuccessAlert('Categoría eliminada exitosamente!');
          this.getData();
        });
      }
    });
  }

  private getData() {
    this.usersService.getAll()
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(users => this.users = users);
  }

}
