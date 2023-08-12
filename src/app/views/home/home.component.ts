import { Component } from '@angular/core';

import { LocalStorageService, RoutingService } from '@ng16-demoapp/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  notes: any = [
    {
      title: 'My goals for the next year',
      date: '31/12/2022',
      content: 'As the year comes...',
    },
    {
      title: 'My goals for the next year',
      date: '31/12/2022',
      content: 'As the year comes...',
    },
    {
      title: 'My goals for the next year',
      date: '31/12/2022',
      content: 'As the year comes...',
    },

    {
      title: 'My goals for the next year',
      date: '31/12/2022',
      content: 'As the year comes...',
    },
    {
      title: 'My goals for the next year',
      date: '31/12/2022',
      content: 'As the year comes...',
    },
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private routingService: RoutingService
  ) {}

  get fullName(): string {
    const user = this.localStorageService.getItem('currentUser');

    return `${user.firstName} ${user.lastName}`;
  }

  logout(): void {
    this.localStorageService.removeItem('currentUser');
    this.routingService.redirectTo('/signin');
  }
}
