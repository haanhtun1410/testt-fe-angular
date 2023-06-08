import { Component } from '@angular/core';
import { LoggedService } from './logged.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'KiemTra';
  loggedAccount: any = null;

  constructor(private logged: LoggedService) {}
  onInit() {
    this.loggedAccount = this.logged.getLoggedInAccount();
  }
}
