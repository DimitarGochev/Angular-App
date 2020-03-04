import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Userdata } from '../models/user-data.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
 
  @Output() submited = new EventEmitter<Userdata>();
  @Input() user: User = new User();
  constructor(private route: ActivatedRoute) { }
  
  
  ngOnInit() {
  }
  
  onSubmit(data: Userdata)
  {
    this.submited.emit({name: data.name, job: data.job}); 
  }
}
