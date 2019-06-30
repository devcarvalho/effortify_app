import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info'
  },
  buttonsStyling: false
});
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  loading = false;
  roles = [
    { value: 'adm', label: 'Administrador' },
    { value: 'qa', label: 'Quality Assurance' },
    { value: 'back_end_dev', label: 'Desenvolvedor Back end' },
    { value: 'front_end_dev', label: 'Desenvolvedor Front end' },
    { value: 'full_stack_dev', label: 'Desenvolvedor Full stack' }
  ];
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  role = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);
  cpf = new FormControl('');
  phoneNumber = new FormControl('');
  hourValue = new FormControl('');
  avatar = new FormControl('');

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  addUser(e: any) {
    e.preventDefault();
    this.name.markAsTouched();
    this.email.markAsTouched();
    this.password.markAsTouched();
    this.confirmPassword.markAsTouched();
    this.role.markAsTouched();
    this.cpf.markAsTouched();
    if (
      this.name.invalid ||
      this.email.invalid ||
      this.password.invalid ||
      this.confirmPassword.invalid ||
      this.role.invalid ||
      this.cpf.invalid
    ) {
      return;
    }

    this.loading = true;

    const user = {
      name: this.name.value,
      password: this.password.value,
      role: this.role.value,
      level: this.role.value === 'adm' ? 0 : 1,
      phone_number: this.phoneNumber.value,
      hour_value: Number(this.hourValue.value),
      cpf: this.cpf.value,
      email: this.email.value,
      avatar: this.avatar.value.replace('data:image/png;base64,', '')
    };

    this.userService.addUser(user).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire(
            'Registrado!',
            'Novo usuário registrado com sucesso!',
            'success'
          )
          .then(() => {
            this.router.navigate(['usuarios']);
          });
      },
      err => {
        this.loading = false;
        swalWithBootstrapButtons.fire(
          'Ops...',
          err.error.error[0].msg,
          'error'
        );
      }
    );
  }

  checkPasswords() {
    if (this.confirmPassword.touched) {
      if (this.confirmPassword.value.length < 8) {
        this.confirmPassword.setErrors({ minlength: true });
      } else if (this.confirmPassword.value !== this.password.value) {
        this.confirmPassword.setErrors({ doesntMatch: true });
      } else {
        this.confirmPassword.setErrors(null);
      }
    }
  }

  getErrorMessage(field: string) {
    switch (field) {
      case 'name':
        return this.name.hasError('required') ? 'O nome é obrigatório.' : null;
      case 'cpf':
        return this.cpf.hasError('required') ? 'O cpf é obrigatório.' : null;
      case 'role':
        return this.role.hasError('required')
          ? 'A função é obrigatória.'
          : null;
      case 'email':
        return this.email.hasError('required')
          ? 'O email é obrigatório'
          : this.email.hasError('email')
          ? 'Email inválido'
          : null;
      case 'password':
        return this.password.hasError('required')
          ? 'A senha é obrigatória'
          : this.password.hasError('minlength')
          ? 'A senha deve conter no mínimo 8 caracteres'
          : null;
      case 'confirmPassword':
        return this.confirmPassword.hasError('required')
          ? 'A confirmação de senha é obrigatória'
          : this.confirmPassword.hasError('minlength')
          ? 'A senha deve conter no mínimo 8 caracteres'
          : this.confirmPassword.hasError('doesntMatch')
          ? 'As senhas não conferem'
          : null;
    }
  }
}
