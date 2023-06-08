import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/logged.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '123@2';
  password: string = '213';
  constructor(
    private sv: ProductService,
    private router: Router,
    private logged: LoggedService
  ) {}

  onSubmit() {
    this.sv.loginAccount(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home-page']);
        this.logged.setLoggedInAccount(response);
      },
      (error) => {
        console.error('Error adding employee:', error);
        alert('Tài Khoản hoặc mật khẩu sai');
      }
    );
  }
}
