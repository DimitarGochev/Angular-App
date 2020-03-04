import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterData } from './models/register.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

class UserAuth {
    constructor(
      public email: string,
      public password: string,
      public token: string,
      public tokenExpirationDate?: Date
    ) { }
  }

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<UserAuth>(null);
    private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { this.autoLogin(); }
    
  autoLogin() {
    const userData: {
      email: string;
      password: string;
      token: string;
      tokenExpirationDate: string;
    } | undefined = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new UserAuth(
      userData.email,
      userData.password,
      userData.token,
      new Date(userData.tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      // const expirationDuration =
      //   new Date(userData.tokenExpirationDate).getTime() -
      //   new Date().getTime();
      // this.autoLogout(expirationDuration);
    }
  }


  login(email: string, password: string) {
    const data: RegisterData = { email, password };
    return this.http.post<string>('https://reqres.in/api/login', data).pipe((tap(
      resData => {
        const user = new UserAuth(email, password, resData);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      })
    ))
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  async logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    await this.router.navigateByUrl('/');
  }
}