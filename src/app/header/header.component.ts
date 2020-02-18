import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;
  userEmail: string = "";

  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    this.userSub = this.requestsService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated)
      this.userEmail = user.email;
    });
  }
    
   onLogout()
   {
     this.requestsService.logout();
   }
      
   ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
