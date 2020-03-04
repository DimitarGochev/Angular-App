import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, BehaviorSubject } from 'rxjs';

import { Userdata } from './models/user-data.model';
import { UsersPage } from './models/users-page.model';
import { RegisterData } from './models/register.model';
import { RegisterResult } from './models/register-result.model';
import { CreateResult } from './models/create-result.model';
import { UpdateResult } from './models/update-result.model';
import { User } from './models/user.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class RequestsService {
  error = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}


  getPage(pageNum: string) {
    return this.http
      .get(
        'https://reqres.in/api/users',
        { params: new HttpParams().set('page', pageNum) }
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
    const data: RegisterData = { email, password };
    return this.http.post<RegisterResult>('https://reqres.in/api/register', data);
  }

  create(name: string, job: string) {
    const data: Userdata = { name: name, job: job };
    return this.http.post<CreateResult>('https://reqres.in/api/users', data);
  }

  update(name: string, job: string, id: number) {
    const data: Userdata = { name: name, job: job };
    return this.http.put<UpdateResult>(`https://reqres.in/api/users/${id}`, data);
  }

}
