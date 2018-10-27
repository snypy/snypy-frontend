import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResource } from "../services/resources/auth.resource";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = AuthResource.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        }
      })
    }

    return next.handle(request);
  };

}
