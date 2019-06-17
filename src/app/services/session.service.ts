import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public sessionData: any;
  private sessionStream = new Subject<any>();

  constructor() {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    try {
      const user = helper.decodeToken(token).user;

      this.sessionData = {
        token,
        userId: user.id,
        userName: user.name,
        userLevel: user.level
      };

      this.sessionStream.next(this.sessionData);

      return (
        typeof user.level === 'number' &&
        typeof user.name === 'string' &&
        typeof user.id === 'string'
      );
    } catch (e) {
      return false;
    }
  }

  setSessionData(data: any): void {
    this.sessionData = {
      token: data.token,
      userId: data.user._id,
      userName: data.user.name,
      userLevel: data.user.level
    };

    this.sessionStream.next(this.sessionData);

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user._id);
  }

  clearSessionData(): void {
    this.sessionData = {};
  }

  getSessionData(): any {
    return this.sessionData;
  }

  getSessionStream(): Observable<any> {
    return this.sessionStream.asObservable();
  }

  logout() {
    this.clearSessionData();
    this.sessionStream.next({});
    localStorage.clear();
  }
}
