import {
  LOGOUT_USER,
  SET_CURRENT_USER,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  UPDATE_USER,
} from './authTypes';
import { User } from '../../types';

type State = {
  currentUser: User;
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SET_AUTH_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_USER:
      return { ...state, currentUser: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
