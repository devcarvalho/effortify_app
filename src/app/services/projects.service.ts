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

  getProject(project: string) {
    return this.http.get(`${this.url}/projects/${project}`, this.httpOptions);
  }

  getProjectsByClient(client: string) {
    return this.http.get(
      `${this.url}/projects/client/${client}`,
      this.httpOptions
    );
  }

  addProject(project: object) {
    return this.http.post(`${this.url}/projects`, project, this.httpOptions);
  }

  updateProject(project: object, projectId: string) {
    return this.http.put(
      `${this.url}/projects/${projectId}`,
      project,
      this.httpOptions
    );
  }

  removeProject(projectId: string) {
    return this.http.delete(
      `${this.url}/projects/${projectId}`,
      this.httpOptions
    );
  }
}
