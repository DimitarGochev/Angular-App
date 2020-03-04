import { Component, OnInit } from '@angular/core';
import { UsersPage } from '../models/users-page.model';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentPage: UsersPage;
  loadedUsersForPage: { [pageNumber: string]: UsersPage } = {};

  //users$: Observable<User[]>;
  isFetching = false;
  error = null;
  private errorSub: Subscription;
  page: string = "1";

  constructor(private router: Router, private requestsService: RequestsService) { }

  ngOnInit() {
    //this.users$ = this.requestsService.get(this.page);


    this.errorSub = this.requestsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.getPage(this.page);
    // this.requestsService.getPage(this.page).subscribe(
    //   posts => {
    //     this.isFetching = false;
    //     this.currentPage = posts;
    //   },
    //   error => {
    //     this.error = error.message;
    //   }
    // );
  }
  onDelete(userNum: any) {
    this.requestsService.delete(userNum).subscribe(
      () => {

        this.currentPage.data.splice(userNum, 1);
      }
    )
  }

  changePage(page: string) {
    this.getPage(page);
  }

  getPage(pageIndex: string) {
    if (this.loadedUsersForPage[pageIndex]) this.currentPage = this.loadedUsersForPage[pageIndex];// do not send request - just update this.currentPage.data....
    else {
      this.isFetching = true;
      this.requestsService.getPage(pageIndex).subscribe(
        usersPage => {
          this.isFetching = false;
          this.currentPage = usersPage;
          this.loadedUsersForPage[pageIndex] = usersPage;
        },
        error => {
          this.error = error.message;
        }
      );
    }
  }

  onUpdate(id: string) {
    this.router.navigateByUrl(`update-user/${id}`);

  }
}
