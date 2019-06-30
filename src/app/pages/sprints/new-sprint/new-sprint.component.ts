import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectsService } from '../../../services/projects.service';
import { UserService } from '../../../services/user.service';
import { SprintsService } from '../../../services/sprints.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.scss']
})
export class NewSprintComponent implements OnInit {
  loading = false;
  users: any;
  projects: any;
  name = new FormControl('', [Validators.required]);
  project = new FormControl('', [Validators.required]);
  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);
  team = new FormControl('');
  description = new FormControl('');

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private sprintsService: SprintsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  addSprint(e: any) {
    e.preventDefault();
    this.name.markAsTouched();
    this.project.markAsTouched();
    this.startDate.markAsTouched();
    this.endDate.markAsTouched();
    if (
      this.name.invalid ||
      this.project.invalid ||
      this.startDate.invalid ||
      this.endDate.invalid
    ) {
      console.log(this.endDate);
      return;
    }

    this.loading = true;

    const sprint = {
      name: this.name.value,
      project: this.project.value,
      team: this.team.value,
      start_date: this.startDate.value,
      end_date: this.endDate.value,
      description: this.description.value
    };

    console.log('sprint', sprint);

    this.sprintsService.addSprint(sprint).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire('Registrada!', 'Nova Sprint adicionada com sucesso!', 'success')
          .then(() => {
            this.router.navigate(['sprints']);
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
      case 'project':
        return this.project.hasError('required')
          ? 'O projeto é obrigatório.'
          : null;
      case 'startDate':
        return this.startDate.hasError('required')
          ? 'A data inicial é obrigatória.'
          : null;
      case 'endDate':
        return this.endDate.hasError('required')
          ? 'A data final é obrigatória.'
          : this.endDate.hasError('matDatepickerMin')
          ? 'A data final deve ser maior que a data de inicio.'
          : null;
    }
  }
}
