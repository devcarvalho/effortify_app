import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionData: any;

  constructor() {}

  setSessionData(data: any) {
    this.sessionData = {
      token: data.token,
      userId: data.user._id,
      userName: data.user.name,
      userLevel: data.user.level
    };
  }

  clearSessionData() {
    this.sessionData = {};
  }

  getSessionData(): any {
    return this.sessionData;
  }
}
