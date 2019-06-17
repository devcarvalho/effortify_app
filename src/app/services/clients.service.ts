import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
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

  getClients() {
    return this.http.get(`${this.url}/clients`, this.httpOptions);
  }

  getClient(clientId: string) {
    return this.http.get(`${this.url}/clients/${clientId}`, this.httpOptions);
  }

  addClient(client: object) {
    return this.http.post(`${this.url}/clients`, client, this.httpOptions);
  }

  updateClient(client: object, clientId: string) {
    return this.http.put(
      `${this.url}/clients/${clientId}`,
      client,
      this.httpOptions
    );
  }

  removeClient(clientId: string) {
    return this.http.delete(
      `${this.url}/clients/${clientId}`,
      this.httpOptions
    );
  }
}
