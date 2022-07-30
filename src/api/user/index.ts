import { Dispatch, useReducer } from 'react';
import axios from 'axios';

import { defaultState } from '../../providers/user';
import { user } from './reducers';
import { Actions, IUser, UserState, UserTypes } from './types';

const initialState: UserState = defaultState.store;

export const useUser = (): [UserState, Dispatch<UserTypes>] => {
  const [state, dispatch] = useReducer(user, initialState);
  return [state, dispatch];
}

export async function createUser(inputData: IUser, dispatch: Dispatch<UserTypes>): Promise<void> {
  dispatch({ type: Actions.CREATE_USER_START, payload: undefined });
  try {
    const { data } = await axios.post('http://httpbin.org/post', inputData);

    console.log(data);

    const userData = JSON.parse(data.data);

    dispatch({ type: Actions.CREATE_USER_FULFILLED, payload: userData });
  } catch (e) {
    dispatch({ type: Actions.CREATE_USER_REJECTED, payload: undefined });
  }
}
