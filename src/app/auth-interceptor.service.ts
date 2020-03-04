import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private requestsService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let user = this.requestsService.user.value;
        if (!user)
            return next.handle(req);
        else {
            let token = btoa(user.email + ':' + user.password);
            const modifiedRequest = req.clone({
                headers: req.headers.append("Auth", token)
            });
            return next.handle(modifiedRequest);
        }
    }

}