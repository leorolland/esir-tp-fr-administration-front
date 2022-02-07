import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public clear(): void {
    localStorage.clear();
    this.isLoggedObservable.next(false)
  }
  public save(token: string, id: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(USERNAME_KEY, id);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
    this.isLoggedObservable.next(true)
  }
  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }

  public isLogged(): boolean {
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }

  public isLoggedObservable: BehaviorSubject<boolean> = new BehaviorSubject(this.isLogged());

  public getUsernameKey(): number {
    const username = localStorage.getItem(USERNAME_KEY)
    if (this.isLogged() && username) return parseInt(username)
    else throw Error("No IS_LOGGED_IN or USERNAME_KEY defined in localStorage")
  }
}
