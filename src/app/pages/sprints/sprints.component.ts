import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from '../../services/projects.service';
import { StoriesService } from '../../services/stories.service';
import { SprintsService } from '../../services/sprints.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  tableOpts = {
    title: 'Sprints',
    subtitle: 'Listagem de todas as sprints cadastradas no sistema.'
  };
  tableColumns = [
    'name',
    'project',
    'start_date',
    'end_date',
    'stories',
    'view'
  ];
  tableColumnTitle = {
    name: 'Nome',
    project: 'Projeto',
    start_date: 'Data de Inicio',
    end_date: 'Data Final',
    stories: 'Estórias',
    view: 'Visualizar'
  };
  tableData = [];
  showTable = false;

  constructor(
    private storiesService: StoriesService,
    private projectsService: ProjectsService,
    private sprintsService: SprintsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sprintsService.getSprints().subscribe((sprints: any) => {
      if (sprints.length) {
        sprints.map((sprint: any) => {
          this.showTable = false;
          this.projectsService
            .getProject(sprint.project)
            .subscribe((project: any) => {
              sprint.project = project.name;
              this.storiesService
                .getStoriesBySprint(sprint._id)
                .subscribe((stories: any) => {
                  sprint.stories = stories.length;
                  this.tableData.push(sprint);
                  if (this.tableData.length === sprints.length) {
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

  newSprint() {
    this.router.navigate(['sprints/nova']);
  }

  viewSprint(sprintId: string) {
    this.router.navigate([`sprints/${sprintId}`]);
  }
}
