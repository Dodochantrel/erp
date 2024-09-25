import { Injectable } from '@angular/core';
import { CookieService as CookieServiceLib } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieServiceLib: CookieServiceLib) { }

  setCookie(name: string, value: string) {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);
    this.cookieServiceLib.set(name, value, { expires: expiryDate, path: '/' });
  }

  getCookie(name: string): string {
    return this.cookieServiceLib.get(name);
  }

  deleteCookie(name: string) {
    this.cookieServiceLib.delete(name);
  }
}
