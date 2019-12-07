export declare type UserList = UserDTO[];

export interface UserDTO {
  idUser?: number;
  firstName: string;
  lastName: string;
  pseudo: string;
  mail: string;
  userType: boolean;
  token?: string;
  password?:string;
}
