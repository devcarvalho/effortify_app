import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
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

  getStories() {
    return this.http.get(`${this.url}/stories`, this.httpOptions);
  }

  getStorie(storie: string) {
    return this.http.get(`${this.url}/stories/${storie}`, this.httpOptions);
  }

  getStoriesBySprint(sprint: string) {
    return this.http.get(
      `${this.url}/stories/sprint/${sprint}`,
      this.httpOptions
    );
  }

  addStorie(storie: object) {
    return this.http.post(`${this.url}/stories`, storie, this.httpOptions);
  }

  updateStorie(storie: object, storieId: string) {
    return this.http.put(
      `${this.url}/stories/${storieId}`,
      storie,
      this.httpOptions
    );
  }

  removeStorie(storieId: string) {
    return this.http.delete(
      `${this.url}/stories/${storieId}`,
      this.httpOptions
    );
  }
}
