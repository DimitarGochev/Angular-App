import { Component, OnInit } from '@angular/core';
import { RegisterData } from '../models/register.model';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string;

  constructor(private router: Router, private registerService: RequestsService) { }

  ngOnInit() {
  }

  onRegister(data: RegisterData)
  {
  this.registerService.register(data.email, data.password).subscribe(
    resData => {
      alert("Registration successful");
      this.router.navigateByUrl("/");
    } ,
    errorResponse => {
      this.error = errorResponse.error.error;
    }
  )
  }
}
