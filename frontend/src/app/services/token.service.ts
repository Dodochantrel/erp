import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  findToken(urlSegments: any[]): string | null {
    return urlSegments.length > 0
      ? urlSegments[urlSegments.length - 1].toString()
      : null;
  }
}
