import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserDTO} from "@app/DTOs/user-dto";
import {HttpClient} from "@angular/common/http";

import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;

  private readonly USER_KEY = "currentUser";

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserDTO>(JSON.parse(localStorage.getItem(this.USER_KEY)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue():UserDTO{
    return this.currentUserSubject.value;
  }

  login(login:string, password:string){
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {login, password})
  }
}

