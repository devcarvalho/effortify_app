import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {
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

  getSprints() {
    return this.http.get(`${this.url}/sprints`, this.httpOptions);
  }

  getSprint(sprint: string) {
    return this.http.get(`${this.url}/sprints/${sprint}`, this.httpOptions);
  }

  getSprintsByProject(project: string) {
    return this.http.get(
      `${this.url}/sprints/project/${project}`,
      this.httpOptions
    );
  }

  addSprint(sprint: object) {
    return this.http.post(`${this.url}/sprints`, sprint, this.httpOptions);
  }

  updateSprint(sprint: object, sprintId: string) {
    return this.http.put(
      `${this.url}/sprints/${sprintId}`,
      sprint,
      this.httpOptions
    );
  }

  removeSprint(sprintId: string) {
    return this.http.delete(
      `${this.url}/sprints/${sprintId}`,
      this.httpOptions
    );
  }
}
