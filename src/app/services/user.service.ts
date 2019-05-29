import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  // httpOptions = {
  //   headers: new HttpHeaders({

  //   })
  // };

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth`, { email, password });
  }
}
