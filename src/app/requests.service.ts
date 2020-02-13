import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './models/post.model';
import { UsersPage } from './models/users-page.model';
import { RegisterData } from './models/register.model';
import { RegisterResult } from './models/register-result.model';
import { CreateResult } from './models/create-result.model';
import { UpdateResult } from './models/update-result.model';
import { User } from './models/user.model';

interface UserAuth {
  email: string;
  password: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class RequestsService {
  user: UserAuth;
  error = new Subject<string>();
   
  constructor(private http: HttpClient) {}


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
          return responseData.data;
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
    return this.http.post<RegisterResult>('https://reqres.in/api/register', data)
    .toPromise();
  }
   
  login(email: string, password: string) {
    const data: RegisterData = {email: email, password: password};
    return this.http.post<string>('https://reqres.in/api/login', data).pipe((tap(
      resData => {
         this.user = {email: email, password: password, token: resData};
    })
    ))
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
