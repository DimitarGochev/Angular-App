import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Userdata } from '../models/user-data.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Output() submited = new EventEmitter<Userdata>();
  @Input() user: User = new User();
  @ViewChild('postForm', { static: true }) private postForm: NgForm;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public resetForm() {
    this.postForm.reset();
  }

  onSubmit(data: Userdata) {
    this.submited.emit({ name: data.name, job: data.job });
  }
}
