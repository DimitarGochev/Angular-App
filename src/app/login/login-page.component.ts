import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { RegisterData } from '../models/register.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
   error: string;

  constructor(private router: Router, private registerService: RequestsService) { }

  ngOnInit() {
  }

  onLogin(data: RegisterData) {
    this.registerService.login(data.email, data.password).subscribe(
      resData => {
        this.router.navigateByUrl("/users");
      } ,
      errorResponse => {
        this.error = errorResponse.error.error;
      }
    )
  }

  // async onLogin(data: RegisterData)
  // {
  //   this.response = await this.registerService.login(data.email, data.password).toPromise();
  // }

}
