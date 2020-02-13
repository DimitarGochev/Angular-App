import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { RequestsService } from './requests.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private requestsService: RequestsService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(this.requestsService.user)
        {
            return next.handle(req);
        }
        else
        return next.handle(req);
    }
}