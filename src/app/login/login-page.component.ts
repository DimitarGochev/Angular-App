import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { RegisterData } from '../register.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private http: HttpClient, private registerService: RequestsService) { }

  ngOnInit() {
  }

  async onLogin(data: RegisterData)
  {
   const response = await this.registerService.login(data.email, data.password).toPromise();
  }

}
