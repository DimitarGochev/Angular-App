import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { RequestsService } from './requests.service';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private requestsService: RequestsService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.requestsService.user.pipe(
            take(1),
            exhaustMap(user => {
              if (!user) {
                return next.handle(req);
              }
              let token = btoa(user.email + ':' + user.password);
              const modifiedRequest = req.clone({
                  headers: req.headers.append("Auth", token)
              });
              return next.handle(modifiedRequest);
            })
          );
        }
}