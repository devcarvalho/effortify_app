import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClientsService } from '../../../services/clients.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  loading = false;
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  cnpj = new FormControl('');
  phoneNumber = new FormControl('');
  avatar = new FormControl('');

  constructor(private router: Router, private clientsService: ClientsService) {}

  ngOnInit() {}

  addClient() {
    this.name.markAsTouched();
    this.email.markAsTouched();
    if (this.name.invalid || this.email.invalid) {
      return;
    }

    this.loading = true;

    const client = {
      name: this.name.value,
      phone_number: this.phoneNumber.value,
      cnpj: this.cnpj.value,
      email: this.email.value,
      avatar: this.avatar.value.replace('data:image/png;base64,', '')
    };

    this.clientsService.addClient(client).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire(
            'Registrado!',
            'Novo cliente registrado com sucesso!',
            'success'
          )
          .then(() => {
            this.router.navigate(['clientes']);
          });
      },
      err => {
        this.loading = false;
        swalWithBootstrapButtons.fire(
          'Ops...',
          'Algo deu errado, por favor tente novamente.',
          'error'
        );
      }
    );
  }

  getErrorMessage(field: string) {
    switch (field) {
      case 'name':
        return this.name.hasError('required')
          ? 'A razão social é obrigatória.'
          : null;
      case 'email':
        return this.email.hasError('email') ? 'Email inválido' : null;
    }
  }
}
