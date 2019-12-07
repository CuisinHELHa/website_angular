import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO, UserList} from "../DTOs/user-dto";

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

  post(ingredient: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(UserService.URL, ingredient);
  }

  put(ingredient: UserDTO): Observable<any> {
    return this.http.put(UserService.URL, ingredient);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${UserService.URL}/${id}`);
  }
}
