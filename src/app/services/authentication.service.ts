import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserDTO} from '@app/DTOs/user-dto';
import {HttpClient} from '@angular/common/http';

import {environment} from '@environments/environment';
import {map} from 'rxjs/operators';
import {sha256} from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static readonly AUTH_API_PATH: string = '/api/users/authenticate';
  public static readonly SIGNUP_API_PATH: string = '/api/users';
  public static readonly USER_KEY: string = 'currentUser';
  public currentUser: Observable<UserDTO>;
  private currentUserSubject: BehaviorSubject<UserDTO>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserDTO>(JSON.parse(localStorage.getItem(AuthenticationService.USER_KEY)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDTO {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    password = sha256(password);

    const authPath = `${environment.apiUrl}${AuthenticationService.AUTH_API_PATH}`;
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', authPath);
    return this.http.post<any>(authPath, {username, password})
      .pipe(map(user => {
        localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  signUp(user: UserDTO) {
    user.password = sha256(user.password);

    const signUpPath = `${environment.apiUrl}${AuthenticationService.SIGNUP_API_PATH}`;
    return this.http.post<any>(signUpPath, user)
      .pipe(map(newUser => {
        return newUser;
      }));
  }

  logout() {
    localStorage.removeItem(AuthenticationService.USER_KEY);
    this.currentUserSubject.next(null);
  }
}

