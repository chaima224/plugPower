import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  loginData = {
    username: '',
    password: '',
  };

  userLogin() {
    this.authService.userLogin(this.loginData).subscribe(
      (value: boolean) => {
        if (value) {
          this.authService.loadUserInfo();
          console.log(this.authService.userInfo.getValue());
          if (this.authService.userInfo.getValue().role == 'admin')
            this.route.navigate(['admin']);
          else {
            this.route.navigate(['map']);
          }
        } else {
          alert('failed');
        }
      },
      (error) => {
        alert('failed');
      }
    );
  }

  ngOnInit(): void {}
}
