import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsService } from '../../../services/projects.service';
import { ClientsService } from '../../../services/clients.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
    cancelButton: 'btn btn-default btn-round ml-3'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  projectId: string;
  loading = false;
  clients: any;
  name = new FormControl('', [Validators.required]);
  client = new FormControl('', [Validators.required]);
  value = new FormControl('');
  description = new FormControl('');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientsService.getClients().subscribe(clients => {
      this.clients = clients;
    });

    this.route.params.subscribe(params => {
      this.projectId = params.id;
      this.getProject();
    });
  }

  getProject() {
    this.loading = true;
    this.projectsService.getProject(this.projectId).subscribe(
      (res: any) => {
        this.loading = false;
        this.name.setValue(res.name);
        this.client.setValue(res.client);
        this.value.setValue(res.value);
        this.description.setValue(res.description);
      },
      err => {
        this.loading = false;
        this.showErrAlert();
      }
    );
  }

  updateProject(e: any) {
    e.preventDefault();
    this.name.markAsTouched();
    this.client.markAsTouched();
    if (this.name.invalid || this.client.invalid) {
      return;
    }

    this.loading = true;

    const project = {
      name: this.name.value,
      client: this.client.value,
      description: this.description.value,
      value: Number(this.value.value)
    };

    this.projectsService.updateProject(project, this.projectId).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire(
            'Atualizado!',
            'Dados do projeto alterados com sucesso!',
            'success'
          )
          .then(() => {
            this.router.navigate(['projetos']);
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

  removeProject() {
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
          this.projectsService.removeProject(this.projectId).subscribe(
            () => {
              this.loading = false;
              swalWithBootstrapButtons
                .fire(
                  'Removido!',
                  'O projeto foi removido com sucesso!',
                  'success'
                )
                .then(() => {
                  this.router.navigate(['projetos']);
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
        return this.name.hasError('required') ? 'O nome é obrigatório.' : null;
      case 'client':
        return this.client.hasError('required')
          ? 'O cliente é obrigatório.'
          : null;
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
