import { Component } from '@angular/core';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exercise';

  constructor(private requestsService: RequestsService) {}

  ngOnInit() {
    this.requestsService.autoLogin();
  }

}
