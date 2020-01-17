import {
  LOGOUT_USER,
  SET_CURRENT_USER,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from './auth.types';

export default (state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case SET_AUTH_ERROR:
      console.log(action.payload);
      return { ...state, error: action.payload };
    case CLEAR_AUTH_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};
