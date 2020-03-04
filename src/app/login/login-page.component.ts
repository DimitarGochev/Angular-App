import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../models/register.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
   error: string;

  constructor(private router: Router, private registerService: AuthService) { }

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
}
