import React, { createContext, useReducer, useContext } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import reducer from "./auth.reducer";
import { LOGOUT_USER } from "./auth.types";

const AuthContext = createContext();

const AuthProvider = ({ children, currentUser }) => {
  const initialState = {
    currentUser
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const logout = () => {
    cookie.remove("token");
    window.localStorage.setItem("logout", Date.now());
    Router.push("/login");
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
