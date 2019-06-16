import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientsService } from '../../services/clients.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  tableOpts = {
    title: 'Clientes',
    subtitle: 'Listagem de todos os clientes cadastrados no sistema.'
  };
  tableColumns = ['name', 'cnpj', 'email', 'phone_number', 'projects', 'view'];
  tableColumnTitle = {
    name: 'Nome',
    cnpj: 'CNPJ',
    email: 'Email',
    phone_number: 'Telefone',
    projects: 'Projetos',
    view: 'Visualizar'
  };
  tableData = [];
  showTable = false;

  constructor(
    private clientsService: ClientsService,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientsService.getClients().subscribe((clients: any) => {
      clients.map((client: any) => {
        this.showTable = false;
        this.projectsService
          .getProjectsByClient(client._id)
          .subscribe((projects: any) => {
            client.projects = projects.length;
            this.tableData.push(client);
            this.showTable = true;
          });
      });
    });
  }

  newClient() {
    this.router.navigate(['clientes/novo']);
  }

  viewClient(clientId: string) {
    this.router.navigate([`clientes/${clientId}`]);
  }
}
