import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { UsersComponent } from './pages/users/users.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { UpdateUserComponent } from './pages/users/update-user/update-user.component';

import { ClientsComponent } from './pages/clients/clients.component';
import { NewClientComponent } from './pages/clients/new-client/new-client.component';
import { UpdateClientComponent } from './pages/clients/update-client/update-client.component';

import { ProjectsComponent } from './pages/projects/projects.component';
import { NewProjectComponent } from './pages/projects/new-project/new-project.component';
import { UpdateProjectComponent } from './pages/projects/update-project/update-project.component';

import { SprintsComponent } from './pages/sprints/sprints.component';
import { NewSprintComponent } from './pages/sprints/new-sprint/new-sprint.component';
import { UpdateSprintComponent } from './pages/sprints/update-sprint/update-sprint.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard],
    component: UsersComponent
  },
  {
    path: 'usuarios/novo',
    canActivate: [AuthGuard],
    component: NewUserComponent
  },
  {
    path: 'usuarios/:id',
    canActivate: [AuthGuard],
    component: UpdateUserComponent
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    component: ClientsComponent
  },
  {
    path: 'clientes/novo',
    canActivate: [AuthGuard],
    component: NewClientComponent
  },
  {
    path: 'clientes/:id',
    canActivate: [AuthGuard],
    component: UpdateClientComponent
  },
  {
    path: 'projetos',
    canActivate: [AuthGuard],
    component: ProjectsComponent
  },
  {
    path: 'projetos/novo',
    canActivate: [AuthGuard],
    component: NewProjectComponent
  },
  {
    path: 'projetos/:id',
    canActivate: [AuthGuard],
    component: UpdateProjectComponent
  },
  {
    path: 'sprints',
    canActivate: [AuthGuard],
    component: SprintsComponent
  },
  {
    path: 'sprints/nova',
    canActivate: [AuthGuard],
    component: NewSprintComponent
  },
  {
    path: 'sprints/:id',
    canActivate: [AuthGuard],
    component: UpdateSprintComponent
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
