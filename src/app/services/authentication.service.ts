import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserDTO} from "@app/DTOs/user-dto";
import {HttpClient} from "@angular/common/http";

import {environment} from "@environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public static readonly AUTH_API_PATH:string = "/api/users/authenticate";
  public static readonly USER_KEY:string = "currentUser";

  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserDTO>(JSON.parse(localStorage.getItem(AuthenticationService.USER_KEY)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue():UserDTO{
    return this.currentUserSubject.value;
  }

  login(username:string, password:string){
    let authPath = `${environment.apiUrl}${AuthenticationService.AUTH_API_PATH}`;
    // let authPath = `https://localhost:5001${AuthenticationService.AUTH_API_PATH}`;
    return this.http.post<any>(authPath, {username, password})
      .pipe(map(user => {
        localStorage.setItem(AuthenticationService.USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(){
    localStorage.removeItem(AuthenticationService.USER_KEY);
    this.currentUserSubject.next(null);
  }
}

