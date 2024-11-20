import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let myTokan:any = localStorage.getItem('authToken');
    
    if (myTokan && request.headers.has('X-Skip-Interceptor')) {
      let token = myTokan
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
          // 'bearerToken' : token 
        }
      })
    }
    
    return next.handle(request)
  }
}
