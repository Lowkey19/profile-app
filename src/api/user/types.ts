export interface Action<T, P extends unknown = undefined> {
  payload: P extends infer Q ? Q : undefined;
  type: T;
}

export enum Actions {
  CREATE_USER_START = "@user/CREATE_USER_START",
  CREATE_USER_FULFILLED = "@user/CREATE_USER_FULFILLED",
  CREATE_USER_REJECTED = "@user/CREATE_USER_REJECTED",
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: Date;
  city: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export type UserState = {
  selectedUser: IUser;
  isLoading: boolean;
}

type CreateUserRequest = Action<typeof Actions.CREATE_USER_START>;
type CreateUserAction = Action<typeof Actions.CREATE_USER_FULFILLED, IUser>;
type CreateUserError = Action<typeof Actions.CREATE_USER_REJECTED>;

export type UserTypes = CreateUserRequest | CreateUserAction | CreateUserError;