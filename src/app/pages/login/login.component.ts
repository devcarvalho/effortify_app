import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
    cancelButton: 'btn btn-default btn-round ml-3'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.password.markAsTouched();
    this.email.markAsTouched();
    if (this.password.invalid || this.email.invalid) {
      return;
    }

    this.loading = true;

    this.userService.login(this.email.value, this.password.value).subscribe(
      res => {
        this.loading = false;
        this.sessionService.setSessionData(res);
        this.router.navigate(['dashboard']);
      },
      err => {
        this.loading = false;

        swalWithBootstrapButtons.fire(
          'Ops...',
          err.error.errors[0].msg,
          'error'
        );
      }
    );
  }

  getErrorMessage(field: string) {
    switch (field) {
      case 'email':
        return this.email.hasError('email')
          ? 'Email inválido'
          : this.email.hasError('required')
          ? 'Email é obrigatório'
          : null;
      case 'password':
        return this.password.hasError('required')
          ? 'A senha é obrigatória.'
          : null;
    }
  }
}
