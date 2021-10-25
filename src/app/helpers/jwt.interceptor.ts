import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResource } from '../services/resources/auth.resource';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = AuthResource.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
