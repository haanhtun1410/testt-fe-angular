import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoggedService {
  private loggedInAccount: any;

  constructor() {}

  setLoggedInAccount(account: any) {
    this.loggedInAccount = account;
  }

  getLoggedInAccount() {
    return this.loggedInAccount;
  }
}
