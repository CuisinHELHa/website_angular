import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO, UserList} from "../DTOs/user-dto";
import {environment} from "@environments/environment";
import {PasswordDTO} from "@app/DTOs/password-dto";
import {MailDTO} from "@app/DTOs/mail-dto";
import {sha256} from "js-sha256";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static URL: string = "/api/users";

  constructor(public http: HttpClient) {
  }

  query(): Observable<UserList> {
    return this.http.get<UserList>(UserService.URL);
  }

  post(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(environment.apiUrl + UserService.URL, user);
  }

  put(user: UserDTO): Observable<any> {
    return this.http.put(UserService.URL, user);
  }

  putPassword(pwd: PasswordDTO): Observable<any>{
    pwd.passwordOld = sha256(pwd.passwordOld);
    pwd.passwordNew = sha256(pwd.passwordNew);
    return this.http.put(UserService.URL + "/password", pwd);
  }

  putMail(mail: MailDTO): Observable<any>{
    return  this.http.put(UserService.URL + "/mail", mail);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${UserService.URL}/${id}`);
  }
}
