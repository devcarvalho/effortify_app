import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientsService } from '../../../services/clients.service';
import { ProjectsService } from '../../../services/projects.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
    cancelButton: 'btn btn-default btn-round ml-3'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
  loading = false;
  clientId: string;
  clientProjects = [];
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  cnpj = new FormControl('');
  phoneNumber = new FormControl('');
  avatar = new FormControl('');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = params.id;
      this.getClient();
      this.getClientProjects();
    });
  }

  getClient() {
    this.loading = true;
    this.clientsService.getClient(this.clientId).subscribe(
      (res: any) => {
        this.loading = false;
        this.name.setValue(res.name);
        this.cnpj.setValue(res.cnpj);
        this.phoneNumber.setValue(res.phone_number);
        this.email.setValue(res.email);

        if (res.avatar.data.length) {
          this.avatar.setValue(
            'data:image/png;base64,' +
              btoa(
                String.fromCharCode.apply(null, new Uint8Array(res.avatar.data))
              )
          );
        }
      },
      () => {
        this.loading = false;
        this.showErrAlert();
      }
    );
  }

  getClientProjects() {
    this.projectsService.getProjectsByClient(this.clientId).subscribe(
      (res: any) => {
        this.clientProjects = res;
      },
      () => {
        this.showErrAlert();
      }
    );
  }

  updateClient() {
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

    this.clientsService.updateClient(client, this.clientId).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire(
            'Atualizado!',
            'Dados do cliente alterados com sucesso!',
            'success'
          )
          .then(() => {
            this.router.navigate(['clientes']);
          });
      },
      () => {
        this.loading = false;
        this.showErrAlert();
      }
    );
  }

  removeClient() {
    swalWithBootstrapButtons
      .fire({
        title: 'Tem certeza?',
        text: 'Esta ação não poderá ser desfeita.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      })
      .then(res => {
        if (res.value) {
          this.loading = true;
          this.clientsService.removeClient(this.clientId).subscribe(
            () => {
              this.loading = false;
              swalWithBootstrapButtons
                .fire(
                  'Removido!',
                  'O cliente foi removido com sucesso!',
                  'success'
                )
                .then(() => {
                  this.router.navigate(['clientes']);
                });
            },
            () => {
              this.loading = false;
              this.showErrAlert();
            }
          );
        }
      });
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

  showErrAlert() {
    swalWithBootstrapButtons.fire(
      'Ops...',
      'Algo deu errado, por favor tente novamente.',
      'error'
    );
  }
}
