import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';
import { UsersPage } from './users-page.model';
import { RegisterData } from './register.model';
import { RegisterResult } from './register-result.model';
import { CreateResult } from './create-result.model';
import { UpdateResult } from './update-result.model';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}


  get() {
    return this.http
      .get(
        'https://reqres.in/api/users?page=1'
      )
      .pipe(
        map((responseData: UsersPage) => {
          // const postsArray= [];
          // for (const key in responseData) {
          //     postsArray.push(responseData[key]);
          // }
          return responseData.data;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://reqres.in/api/users'
    );
  }
  
  register(email: string, password: string) {
    const data: RegisterData = {email, password};
    return this.http.post<RegisterResult>('https://reqres.in/api/register', data)
    .toPromise();
  }
   
  login(email: string, password: string) {
    const data: RegisterData = {email: email, password: password};
    return this.http.post<{token: string}>('https://reqres.in/api/login', data);
  }

  create(name: string, job: string) {
    const data: Post = {name: name, job: job};
   return this.http.post<CreateResult>('https://reqres.in/api/users', data, {headers: new HttpHeaders({'Authorization': 'username:password'})} ).toPromise();
  }

  update(name:string, job:string) {
    const data: Post = {name: name, job: job};
    return this.http.put<UpdateResult>('https://reqres.in/api/users/1', data);      
  }
    
}
