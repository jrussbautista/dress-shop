import { LOGOUT_USER } from "./auth.types";

export default (state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};
