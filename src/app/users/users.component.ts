import { Component, OnInit } from '@angular/core';
import { Get } from '../get.model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { Data } from '../get-page.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loadedPosts: Get[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private requestsService: RequestsService) {}

  ngOnInit() {
    this.errorSub = this.requestsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.requestsService.get().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
        console.log(posts);
      },
      error => {
        this.error = error.message;
      }
    );
  } 

}
