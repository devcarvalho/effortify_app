import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientsService } from '../../services/clients.service';
import { ProjectsService } from '../../services/projects.service';
import { SprintsService } from '../../services/sprints.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  tableOpts = {
    title: 'Projetos',
    subtitle: 'Listagem de todos os projetos cadastrados no sistema.'
  };
  tableColumns = ['name', 'client', 'start_date', 'sprints', 'value', 'view'];
  tableColumnTitle = {
    name: 'Nome',
    client: 'Cliente',
    start_date: 'Data de Inicio',
    sprints: 'Sprints',
    value: 'Valor',
    view: 'Visualizar'
  };
  tableData = [];
  showTable = false;

  constructor(
    private clientsService: ClientsService,
    private projectsService: ProjectsService,
    private sprintsService: SprintsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectsService.getProjects().subscribe((projects: any) => {
      if (projects.length) {
        projects.map((project: any) => {
          this.showTable = false;
          this.clientsService
            .getClient(project.client)
            .subscribe((client: any) => {
              project.client = client.name;
              this.sprintsService
                .getSprintsByProject(project._id)
                .subscribe((sprints: any) => {
                  project.sprints = sprints.length;
                  this.tableData.push(project);
                  if (this.tableData.length === projects.length) {
                    this.showTable = true;
                  }
                });
            });
        });
      } else {
        this.showTable = true;
      }
    });
  }

  newProject() {
    this.router.navigate(['projetos/novo']);
  }

  viewProject(projectId: string) {
    this.router.navigate([`projetos/${projectId}`]);
  }
}
