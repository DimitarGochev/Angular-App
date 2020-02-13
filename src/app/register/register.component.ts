import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../models/register.model';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { RegisterResult } from '../models/register-result.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private http: HttpClient, private registerService: RequestsService) { }

  ngOnInit() {
  }

  onRegister(data: RegisterData)
  {
  this.registerService.register(data.email, data.password);
  }
}
