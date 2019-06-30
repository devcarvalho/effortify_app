import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectsService } from '../../../services/projects.service';
import { UserService } from '../../../services/user.service';
import { SprintsService } from '../../../services/sprints.service';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-info',
    cancelButton: 'btn btn-default btn-round ml-3'
  },
  buttonsStyling: false
});

@Component({
  selector: 'app-update-sprint',
  templateUrl: './update-sprint.component.html',
  styleUrls: ['./update-sprint.component.scss']
})
export class UpdateSprintComponent implements OnInit {
  loading = false;
  sprintId: string;
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
    private route: ActivatedRoute,
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

    this.route.params.subscribe(params => {
      this.sprintId = params.id;
      this.getSprint();
    });
  }

  getSprint() {
    this.loading = true;
    this.sprintsService.getSprint(this.sprintId).subscribe(
      (res: any) => {
        this.loading = false;
        this.name.setValue(res.name);
        this.project.setValue(res.project);
        this.startDate.setValue(res.start_date);
        this.endDate.setValue(res.end_date);
        this.team.setValue(res.team);
        this.description.setValue(res.description);
      },
      err => {
        this.loading = false;
        this.showErrAlert();
      }
    );
  }

  updateSprint(e: any) {
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

    this.sprintsService.updateSprint(sprint, this.sprintId).subscribe(
      res => {
        this.loading = false;
        swalWithBootstrapButtons
          .fire('Atualizada!', 'Sprint atualizada com sucesso!', 'success')
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

  removeSprint() {
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
          this.sprintsService.removeSprint(this.sprintId).subscribe(
            () => {
              this.loading = false;
              swalWithBootstrapButtons
                .fire(
                  'Removida!',
                  'A sprint foi removida com sucesso!',
                  'success'
                )
                .then(() => {
                  this.router.navigate(['sprints']);
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

  showErrAlert() {
    swalWithBootstrapButtons.fire(
      'Ops...',
      'Algo deu errado, por favor tente novamente.',
      'error'
    );
  }
}
