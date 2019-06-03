import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionData: any;
  private sessionStream = new Subject<any>();

  constructor() {}

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
    this.sessionStream.next();
    localStorage.clear();
  }
}
