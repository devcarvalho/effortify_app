import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.sessionService.logout();
    this.router.navigate(['login']);
  }
}
