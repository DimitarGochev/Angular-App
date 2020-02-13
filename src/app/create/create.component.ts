import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

import { Post } from '../models/post.model';
import { RequestsService } from '../requests.service';
import { CreateResult } from '../models/create-result.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  implements OnInit {
  error = null;
  private errorSub: Subscription;
  createResponse: CreateResult;


  constructor(private http: HttpClient, private requestsService: RequestsService) {}

  ngOnInit() {
    this.errorSub = this.requestsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

 async onCreate(data: Post) {
    // Send Http request
  this.createResponse = await this.requestsService.create(data.name, data.job);
  }

}
