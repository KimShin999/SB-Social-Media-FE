import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authreq = request;
    const token = this.token.getToken();
    if(token != null){
      authreq = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)})
    }
    return next.handle(authreq);

  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
