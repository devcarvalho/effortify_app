import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.url = environment.apiUrl;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth`, { email, password });
  }

  checkAuth(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: token
        })
      };
      this.http.get(`${this.url}/auth`, httpOptions).subscribe(
        (res: any) => {
          this.sessionService.setSessionData({
            token,
            user: {
              _id: res.user.id,
              name: res.user.name,
              level: res.user.level
            }
          });
          this.router.navigate(['']);
        },
        err => {
          return this.router.navigate(['login']);
        }
      );
    } else {
      return this.router.navigate(['login']);
    }
  }
}
