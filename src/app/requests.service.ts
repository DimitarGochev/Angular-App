import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, BehaviorSubject } from 'rxjs';

import { Post } from './models/post.model';
import { UsersPage } from './models/users-page.model';
import { RegisterData } from './models/register.model';
import { RegisterResult } from './models/register-result.model';
import { CreateResult } from './models/create-result.model';
import { UpdateResult } from './models/update-result.model';
import { User } from './models/user.model';
import { Router } from '@angular/router';

class UserAuth {
  constructor(
  public email: string,
  public password: string,
  public token: string,
  public tokenExpirationDate?: Date
  ) {}
}

@Injectable({ providedIn: 'root' })
export class RequestsService {
  user = new BehaviorSubject<UserAuth>(null);
  error = new Subject<string>();
  private tokenExpirationTimer: any;
   
  constructor(private http: HttpClient, private router: Router) {}


  get(pageNum: string) {
    return this.http
      .get(
        'https://reqres.in/api/users',
        {params: new HttpParams().set('page', pageNum )}
      )
      .pipe(
        map((responseData: UsersPage) => {
          // const postsArray= [];
          // for (const key in responseData) {
          //     postsArray.push(responseData[key]);
          // }
          return responseData;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
 
  getUser(id: string) {
    return this.http.get(`https://reqres.in/api/users/${id}`).pipe(map<any, User>(resData => resData.data));
  }
 
  delete(userNum: string) {
    return this.http.delete(
      'https://reqres.in/api/users/' + userNum
    );
  }
  
  register(email: string, password: string) {
    const data: RegisterData = {email, password};
    return this.http.post<RegisterResult>('https://reqres.in/api/register', data);
  }
  
  autoLogin() {
    const userData: {
      email: string;
      password: string;
      token: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
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
    const data: RegisterData = {email: email, password: password};
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


  logout() {
    this.user.next(null);
    this.router.navigateByUrl('/');
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  create(name: string, job: string) {
    const data: Post = {name: name, job: job};
   return this.http.post<CreateResult>('https://reqres.in/api/users', data).toPromise();
  }

  update(name:string, job:string, id: number) {
    const data: Post = {name: name, job: job};
    return this.http.put<UpdateResult>(`https://reqres.in/api/users/${id}`, data);      
  }
    
}
