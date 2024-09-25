import { Injectable } from '@angular/core';
import { ForgotPasswordInterface, LoginInterface, RegisterInterface, ResetPasswordInterface } from '../class/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  baseUrl = 'http://localhost:3000/auth';

  isAuth(): boolean {
    const refreshToken = this.cookieService.getCookie('refreshToken');
    return refreshToken ? true : false;
  }

  register(user: RegisterInterface) {
    const params = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    return this.http.post(`${this.baseUrl}/register`, params);
  }

  validEmail(token: string | null) {
    const params = {
      token: token,
    };
    return this.http.post(`${this.baseUrl}/validEmail`, params);
  }

  refresh() {
    const options = {
      withCredentials: true
    };
    return this.http.post(`${this.baseUrl}/refresh`, {}, options);
  }

  login(user: LoginInterface) {
    const params = {
      email: user.email,
      password: user.password,
    };
    const options = {
      withCredentials: true
    };
    return this.http.post(`${this.baseUrl}/login`, params, options);
  }
  

  forgotPassword(user: ForgotPasswordInterface) {
    const params = {
      email: user.email,
    };
    return this.http.post(`${this.baseUrl}/forgotPassword`, params);
  }

  resetPassword(user: ResetPasswordInterface) {
    const params = {
      token: user.token,
      password: user.password,
    };
    return this.http.post(`${this.baseUrl}/resetPassword`, params);
  }

  me() {
    const options = {
      withCredentials: true
    };
    return this.http.get(`${this.baseUrl}/me`, options);
  }

  logout() {
    this.cookieService.deleteCookie('accessToken');
    this.cookieService.deleteCookie('refreshToken');
  }
}
