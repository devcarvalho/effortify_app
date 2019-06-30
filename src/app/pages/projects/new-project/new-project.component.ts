import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectsService } from '../../../services/projects.service';
import { ClientsService } from '../../../services/clients.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  loading = false;
  clients: any;
  name = new FormControl('', [Validators.required]);
  client = new FormControl('', [Validators.required]);
  value = new FormControl('');
  description = new FormControl('');

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientsService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  addProject(e: any) {
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

    this.projectsService.addProject(project).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire(
            'Registrado!',
            'Novo projeto adicionado com sucesso!',
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
}
