import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY,Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class HttpGlobalErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const {url, method} = request
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const {
          status,
          statusText
        } = error

        alert(`[${status} ${statusText.toLocaleUpperCase()}]: ${method}:${url}`)

        const errorMessage = this.handleError(error);
        this.toastrService.error(errorMessage, 'Error');
        return throwError(errorMessage);
      })
    );
  }

  private handleError(error: HttpErrorResponse): string {

    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
 
      errorMessage = `Error: ${error.error.message}`;
    } else {
     
      errorMessage = `Status: ${error.status}, Message: ${error.message}`;
    }
    return errorMessage;
  }
}
