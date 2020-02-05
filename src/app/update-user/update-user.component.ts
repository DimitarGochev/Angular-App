import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private http: HttpClient, private requestsService: RequestsService) { }

  ngOnInit() {
  }
    
  onUpdate(data: Post)
  {
    this.requestsService.update(data.name, data.job);
  }
}
