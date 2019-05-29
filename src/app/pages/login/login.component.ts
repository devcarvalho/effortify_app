import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      res => {
        this.sessionService.setSessionData(res);
        this.router.navigate(['dashboard']);
      },
      err => {
        this.openSnackBar(err.error.errors[0].msg, 'OK');
      }
    );
  }

  openSnackBar(label: string, action: string): void {
    const snackBarRef = this.snackBar.open(label, action, {
      // duration: 20000,
      // panelClass: []
    });
  }
}
