import { Component } from '@angular/core';

import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'effortify';
  sessionData = {};

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {
    this.userService.checkAuth();

    this.sessionService.getSessionStream().subscribe(session => {
      if (session) {
        this.sessionData = session;
      } else {
        this.sessionData = {};
      }
    });
  }
}
