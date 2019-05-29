import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userLevel: object;

  constructor(private sessionService: SessionService) {
    this.userLevel = this.sessionService.getSessionData().userLevel;
  }

  ngOnInit() {}
}
