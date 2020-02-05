import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';
import { Get } from './get.model';
import { RegisterData } from './register.model';

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
        map(responseData => {
          const postsArray= [];
          for (const key in responseData) {
              postsArray.push(responseData[key]);
          }
          return postsArray;
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
    const data: RegisterData = {email: email, password: password};
    this.http.post('https://reqres.in/api/register', data)
    .subscribe(responceData => 
      { console.log(responceData); },
       error => {
      this.error.next(error.message);
                }
    );
  }
   
  login(email: string, password: string) {
    const data: RegisterData = {email: email, password: password};
    this.http.post('https://reqres.in/api/login', data)
    .subscribe(responceData => 
      { console.log(responceData); },
       error => {
      this.error.next(error.message);
                }
    );
  }

  create(name: string, job: string) {
    const data: Post = {name: name, job: job};
    this.http.post('https://reqres.in/api/users', data)
    .subscribe(responceData => 
      { console.log(responceData); },
       error => {
      this.error.next(error.message);
                }
    );
  }

  update(name:string, job:string)
  {
    const data: Post = {name: name, job: job};
    this.http.put('https://reqres.in/api/users/1', data)
    .subscribe(responceData => 
      { console.log(responceData); },
       error => {
      this.error.next(error.message);
                }
    );          
  }
    
}
