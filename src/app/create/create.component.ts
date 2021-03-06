import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription} from 'rxjs';

import { Userdata } from '../models/user-data.model';
import { RequestsService } from '../requests.service';
import { CreateResult } from '../models/create-result.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  error = null;
  private errorSub: Subscription;
  createResponse: CreateResult;

  @ViewChild('userForm', { static: true }) userForm: UserFormComponent;

  constructor(private http: HttpClient, private requestsService: RequestsService) { }

  ngOnInit() {
    this.errorSub = this.requestsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  async onCreate(data: Userdata) {
    this.createResponse = await this.requestsService.create(data.name, data.job).toPromise();
    this.userForm.resetForm();
  }

}
