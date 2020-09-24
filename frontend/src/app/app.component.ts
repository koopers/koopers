import { Component, OnInit } from '@angular/core';
import {
  faCheckCircle,
  faEdit,
  faPlus,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './core/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'kooper';
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
