import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionData: any;

  constructor() {}

  setSessionData(data: any): void {
    this.sessionData = {
      token: data.token,
      userId: data.user._id,
      userName: data.user.name,
      userLevel: data.user.level
    };

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user._id);
  }

  clearSessionData(): void {
    this.sessionData = {};
  }

  getSessionData(): any {
    return this.sessionData;
  }
}
