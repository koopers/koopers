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

  coverCardDemo = {
    title: 'El Universal',
    description: 'Cover',
    date: '2020-09-28',
    href: '#',
    image_src_mobile: 'https://via.placeholder.com/153x122',
    image_src_tablet: 'https://via.placeholder.com/153x122',
    image_src_desktop: 'https://via.placeholder.com/153x122',
  };

  siteCardDemo = {
    title: 'El Universal',
    href: '#',
    image_src_mobile: 'https://via.placeholder.com/153x122',
    image_src_tablet: 'https://via.placeholder.com/153x122',
    image_src_desktop: 'https://via.placeholder.com/153x122',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
