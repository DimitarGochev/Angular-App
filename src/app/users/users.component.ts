import { Component, OnInit } from '@angular/core';
import { UsersPage } from '../users-page.model';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loadedPosts: User[] = [];
  users$: Observable<User[]>;
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private requestsService: RequestsService) {}

  ngOnInit() {
    this.users$ = this.requestsService.get();



    // this.errorSub = this.requestsService.error.subscribe(errorMessage => {
    //   this.error = errorMessage;
    // });

    // this.isFetching = true;
    // this.requestsService.get().subscribe(
    //   posts => {
    //     this.isFetching = false;
    //     this.loadedPosts = posts;
    //     console.log(posts);
    //   },
    //   error => {
    //     this.error = error.message;
    //   }
    // );
  } 

}
