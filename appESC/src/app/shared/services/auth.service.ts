import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.loadUserInfo();
  }

  getData(): any {
    return this.userInfo.getValue();
  }

  loadUserInfo() {
    const userData = this.userInfo.getValue();
    if (!userData) {
      const accesstoken = localStorage.getItem('access_token');
      if (accesstoken) {
        const decryptedUser = this.jwtHelper.decodeToken(accesstoken);
        const data = {
          access_token: accesstoken,
          refreshtoken: localStorage.getItem('refresh_token'),
          username: decryptedUser.username,
          userid: decryptedUser.sub,
          tokenExpiration: decryptedUser.exp,
        };

        this.userInfo.next(data);
      }
    }
  }

  userLogin(userPayload: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.http
      .post('http://localhost:8080/api/auth/login', userPayload)
      .pipe(
        map((value: any) => {
          if (value) {
            localStorage.setItem('access_token', value.accessToken);
            localStorage.setItem('refresh_token', value.refreshToken);

            const decryptedUser = this.jwtHelper.decodeToken(value.accessToken);
            console.log(decryptedUser);

            const data = {
              access_token: value.accessToken,
              refreshtoken: value.refreshToken,
              username: decryptedUser.username,
              userid: decryptedUser.sub,
              tokenExpiration: decryptedUser.exp,
            };
            this.userInfo.next(data);
            return true;
          }
          return false;
        })
      );
    //console.log(userPayload);
    //const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
    //const refreshtoken="dummy";
  }

  userRegister(userPayload: {
    username: string;
    password: string;
    nom: string;
    prenom: string;
    telephone: string;
  }): Observable<boolean> {
    return this.http
      .post('http://localhost:8080/api/auth/register', userPayload)
      .pipe(
        map((value: any) => {
          if (value) {
            localStorage.setItem('access_token', value.accessToken);
            localStorage.setItem('refresh_token', value.refreshToken);

            const decryptedUser = this.jwtHelper.decodeToken(value.accessToken);
            console.log(decryptedUser);

            const data = {
              access_token: value.accessToken,
              refreshtoken: value.refreshToken,
              username: decryptedUser.username,
              userid: decryptedUser.sub,
              tokenExpiration: decryptedUser.exp,
            };
            this.userInfo.next(data);
            return true;
          }
          return false;
        })
      );
    //console.log(userPayload);
    //const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
    //const refreshtoken="dummy";
  }
  logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
