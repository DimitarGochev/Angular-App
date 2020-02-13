import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: User;
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
    
  onUpdate(data: Post)
  {
    this.requestsService.update(data.name, data.job);
  }

}
