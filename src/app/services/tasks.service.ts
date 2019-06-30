import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
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

  getTasks() {
    return this.http.get(`${this.url}/tasks`, this.httpOptions);
  }

  getTask(task: string) {
    return this.http.get(`${this.url}/tasks/${task}`, this.httpOptions);
  }

  getTasksBySprint(sprint: string) {
    return this.http.get(
      `${this.url}/tasks/sprint/${sprint}`,
      this.httpOptions
    );
  }

  addTask(task: object) {
    return this.http.post(`${this.url}/tasks`, task, this.httpOptions);
  }

  updateTask(task: object, taskId: string) {
    return this.http.put(`${this.url}/tasks/${taskId}`, task, this.httpOptions);
  }

  removeTask(taskId: string) {
    return this.http.delete(`${this.url}/tasks/${taskId}`, this.httpOptions);
  }
}
