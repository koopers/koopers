import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass'],
})
export class TeamComponent implements OnInit {
  partners = {
    lightSide: [
      {
        id: 1,
        name: 'Oscar Perez',
        url_image: 'assets/img/avatar_one.png',
        url_imageHover: 'assets/img/avatar_one-hover.png',
        description: 'Angular, React',
        role: 'Frontend Developer',
      },
      {
        id: 2,
        name: 'Carol Masmela',
        url_image: 'assets/img/avatar_two.png',
        url_imageHover: 'assets/img/avatar_two-hover.png',
        description: 'Angular',
        role: 'Frontend Developer',
      },
      {
        id: 3,
        name: 'Josue Fuentes',
        url_image: 'assets/img/avatar_three.png',
        url_imageHover: 'assets/img/avatar_three-hover.png',
        description: 'Angular, React',
        role: 'Frontend Developer',
      },
      {
        id: 4,
        name: 'Omar Lopez',
        url_image: 'assets/img/avatar_four.png',
        url_imageHover: 'assets/img/avatar_four-hover.png',
        description: 'React, Devops',
        role: 'Frontend Developer',
      },
    ],
    darkSide: [
      {
        id: 5,
        name: 'David Guerra',
        url_image: 'assets/img/avatar_five.png',
        url_imageHover: 'assets/img/avatar_five-hover.png',
        description: 'Web Scrapping',
        role: 'Data Science and Backend Developer',
      },
      {
        id: 6,
        name: 'Germán Téllez',
        url_image: 'assets/img/avatar_six.png',
        url_imageHover: 'assets/img/avatar_six-hover.png',
        description: 'Django',
        role: 'Backend Developer',
      },
      {
        id: 7,
        name: 'David Bocarejo',
        url_image: 'assets/img/avatar_seven.png',
        url_imageHover: 'assets/img/avatar_seven-hover.png',
        description: 'Django',
        role: 'Backend Developer and DataScience',
      },
    ],
  };

  display = false;

  constructor() {}

  ngOnInit(): void {}

  showModal(): void {
    this.display = true;
  }
}
