import {Pipe, PipeTransform} from '@angular/core';
import {UserDTO} from '@app/DTOs/user-dto';

@Pipe({
  name: 'createUser'
})
export class CreateUserPipe implements PipeTransform {
  private _user: UserDTO;

  transform(username: string, password: string, firstName: string, lastName: string, email: string): UserDTO {
    this._user = {
      pseudo: username,
      password,
      firstName,
      lastName,
      mail: email,
      userType: false,
    };
    return this._user;
  }
}
