import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Userdata } from '../models/user-data.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { UpdateResult } from '../models/update-result.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User;
  response: UpdateResult;
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
  }

}
