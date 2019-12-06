export declare type UserList = UserDTO[];

export interface UserDTO {
  idUser?: number;
  firstName: string;
  lastName: string;
  username: string;
  mail: string;
  userType: boolean;
  token: string;
}
