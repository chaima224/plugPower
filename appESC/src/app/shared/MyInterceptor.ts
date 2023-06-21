import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authData = this.authService.getData();
    if (authData?.access_token) {
      console.log(authData.access_token);

      const modifiedRequest = httpRequest.clone({
        setHeaders: {
          Authorization: 'bearer ' + authData.access_token,
        },
      });

      return next.handle(modifiedRequest);
    }

    // Pass the modified request to the next handler
    return next.handle(httpRequest);
  }
}
