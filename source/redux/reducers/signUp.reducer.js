import * as types from "../constants/signUp.const";
import { nullLiteral } from "@babel/types";

const Initial_state = {
  isLoggedIn: false,
  authData: null,
  userData: null,
}

export default function setAuthDataReducer(state = Initial_state, action) {
  switch (action.type) {
    case types.SET_AUTHDATA:
      return {
        ...state,
        authData: action.payload,
        isLoggedIn: true
      };
    case types.LOGGED_OUT:
      return {
        ...state,
        authData: null,
        userData: null,
        isLoggedIn: false,
      }
    case types.SET_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}