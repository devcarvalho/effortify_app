import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url: string;
  token: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.url = environment.apiUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    };
  }

  getProjects() {
    return this.http.get(`${this.url}/projects`, this.httpOptions);
  }

  getProjectsByClient(client: string) {
    return this.http.get(
      `${this.url}/projects/client/${client}`,
      this.httpOptions
    );
  }
}
