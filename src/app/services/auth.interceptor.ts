import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthTokenService } from './auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: AuthTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('auth.interceptor.ts request: ', request)
    console.log('auth.interceptor.ts token: ', this.token.authJwtToken)
    
    if (this.token.authJwtToken) {
      const clonedRequest = request.clone({
        headers: request.headers.set("Authorization", this.token.authJwtToken)
      });
      
      console.log('cloned request: ', clonedRequest);

      return next.handle(clonedRequest);
    } else {
    
      return next.handle(request);
    }
  }
}
