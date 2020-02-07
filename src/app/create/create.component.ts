import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { RequestsService } from '../requests.service';
import { UsersPage } from '../users-page.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  implements OnInit {
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private requestsService: RequestsService) {}

  ngOnInit() {
    this.errorSub = this.requestsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  onCreate(data: Post) {
    // Send Http request
    this.requestsService.create(data.name, data.job);
  }

}
