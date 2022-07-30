import { Actions, UserState, UserTypes } from "./types";

export function user(state: UserState, action: UserTypes): UserState {
  switch (action.type) {
    case Actions.CREATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.CREATE_USER_FULFILLED: {
      return {
        ...state,
        selectedUser: action.payload,
        isLoading: false,
      }
    }
    case Actions.CREATE_USER_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    default:
      return state;
  }
}