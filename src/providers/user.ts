import { Dispatch, createContext } from 'react';
import { IUser, UserState, UserTypes } from '../api/user/types'

interface IUserContext {
  store: UserState;
  dispatch: Dispatch<UserTypes>;
}

export const defaultState: IUserContext = {
  store: {
    selectedUser: {} as IUser,
    isLoading: false,
  },
  dispatch: (user: UserTypes): void => {},
}

const UserContext = createContext(defaultState);

export default UserContext;