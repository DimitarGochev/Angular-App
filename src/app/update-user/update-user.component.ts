import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Userdata } from '../models/user-data.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateResult } from '../models/update-result.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User ;
  response: UpdateResult;
  @ViewChild('userForm', { static: true }) userForm: UserFormComponent;

  constructor(private route: ActivatedRoute, private requestsService: RequestsService) { }

  async ngOnInit() {
    try {
  const id = this.route.snapshot.params.id;
  this.user = await this.requestsService.getUser(id).toPromise();
    }
    catch {
      alert("User not found!");
    } 
  }
    
 async onUpdate(data: Userdata)
  {
    this.response = await this.requestsService.update(data.name, data.job, this.user.id).toPromise();
    this.userForm.resetForm();
  }

}
