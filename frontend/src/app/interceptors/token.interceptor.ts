import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  retry,
  switchMap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'authorization';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const refreshToken = cookieService.getCookie('refreshToken');
  const tokenInHeader = `Bearer ${refreshToken}`;
  const reqWithHeader = req.clone({
    headers: req.headers.set(TOKEN_HEADER_KEY, tokenInHeader),
  });
  return next(reqWithHeader).pipe(
    catchError((err) => {
      if (err.status === 401) {
        return authService
          .refresh()
          .pipe(
            switchMap(() => {
              const refreshToken =
                cookieService.getCookie('refreshToken');
              const tokenInHeader = `Bearer ${refreshToken}`;
              const reqWithHeader = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, tokenInHeader),
              });
              return next(reqWithHeader);
            }),
            catchError((err) => {
              if (err.status === 401) {
                router.navigate(['auth/login']);
              }
              return throwError(() => err);
            })
          );
      }
      return throwError(() => err);
    })
  );
}
