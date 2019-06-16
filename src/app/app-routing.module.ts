import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ClientsComponent } from './pages/clients/clients.component';
import { NewClientComponent } from './pages/clients/new-client/new-client.component';
import { UpdateClientComponent } from './pages/clients/update-client/update-client.component';

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
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
