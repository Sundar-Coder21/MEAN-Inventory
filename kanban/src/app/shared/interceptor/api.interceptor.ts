import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../service/localstoreage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError } from 'rxjs';
import { UtilityService } from '../service/utility-service.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(LocalStorageService);
  const spinner = inject(NgxSpinnerService);
  const utility = inject(UtilityService);
  const authToken = store.getToken();
  spinner.show()
  {
    let authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    })

    let Apireq = authToken ? authReq : req
    return next(Apireq).pipe(
      finalize(() => {
        spinner.hide();
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              utility.error('Unauthorized request');
              console.error('Unauthorized request:', err);
              break;
            case 404:
              utility.error('Not Found');
              console.error('Not Found:', err);
              break;
            case 500:
              utility.error('Internal Server Error');
              console.error('Internal Server Error:', err);
              break;
            default:
              utility.error('HTTP error');
              console.error('HTTP error:', err);
              break;
          }
        } else {
          utility.error('An error occurred')
          console.error('An error occurred:', err);
        }
        return throwError(() => err);
      }),);
  }

};
