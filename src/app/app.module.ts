import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './pages/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaskModule } from 'ngx-mask';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SwitchCardComponent } from './components/switch-card/switch-card.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { TableComponent } from './components/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UpdateClientComponent } from './pages/clients/update-client/update-client.component';
import { NewClientComponent } from './pages/clients/new-client/new-client.component';
import { PurpleCardComponent } from './components/purple-card/purple-card.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { UsersComponent } from './pages/users/users.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { UpdateUserComponent } from './pages/users/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    SwitchCardComponent,
    HeaderComponent,
    ClientsComponent,
    TableComponent,
    UpdateClientComponent,
    NewClientComponent,
    PurpleCardComponent,
    InfoPanelComponent,
    UsersComponent,
    NewUserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ImageCropperModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
